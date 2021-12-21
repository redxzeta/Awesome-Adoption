import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import Home from "../Home";
import React from "react";
import { server, rest } from "../../../testServer";

test("list of Pets renders correctly", async () => {
  customRender(<Home />);
  expect(screen.getByRole("status")).toBeInTheDocument();
  await waitFor(() =>
    expect(screen.getByRole("status")).not.toBeInTheDocument()
  );
  const petName1 = screen.findByText(/Harley/i);
  const petName2 = screen.findByText(/ISRAEL/i);
  const petName3 = screen.findByText(/Andy & Mandy/i);

  expect(petName1).toBeInTheDocument();
  expect(petName2).toBeInTheDocument();
  expect(petName3).toBeInTheDocument();
});

test("calls SWR mutate when refresh button is clicked", async () => {
  const mutate = jest.fn();
  customRender(<Home onClick={mutate()} />);
  const button = screen.getByRole("button", { name: /refresh/i });
  expect(button).toBeEnabled();
  await act(async () => {
    userEvent.click(button);
  });
  expect(mutate).toHaveBeenCalledTimes(1);
});

test("Error fetching the pet list should display a message", async () => {
  server.use(
    rest.get(
      "https://api.petfinder.com/v2/animals?limit=3&sort=random",
      (_req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ error: "Error" }));
      }
    )
  );
  customRender(<Home />);
  expect(screen.getByRole("status")).toBeInTheDocument();
  await waitFor(() =>
    expect(screen.getByRole("status")).not.toBeInTheDocument()
  );
  const errorMessage = screen.findByText(
    /Oops! An Error Occurred Getting The Pets/i
  );
  expect(errorMessage).toBeInTheDocument();
});

// Rendering of the test component has been wrapped in the SWRConfig as recommended
// here https://github.com/vercel/swr/pull/231
const AllTheProviders = ({ children }) => {
  return (
    <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
      <BrowserRouter>{children}</BrowserRouter>
    </SWRConfig>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });
