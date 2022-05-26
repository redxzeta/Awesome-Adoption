import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { rest, server } from "testServer";

import PetAuthProvider from "../../../context/TokenContext";
import { customRender } from "../../../swrconfigtest";
import Home from "../Home";

// mock pet list

describe("<Home/>", () => {
  test("list of Pets renders correctly", async () => {
    customRender(
      <BrowserRouter>
        <PetAuthProvider>
          <Home />
        </PetAuthProvider>
      </BrowserRouter>
    );
    expect(screen.getAllByRole("status")).toHaveLength(3);
    await waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument()
    );
    const petCards = screen.getAllByRole("button", { name: /More Info/i });
    expect(petCards).toHaveLength(3);
  });

  test("list of Pets refresh correctly", async () => {
    const user = userEvent.setup();
    customRender(
      <BrowserRouter>
        <PetAuthProvider>
          <Home />
        </PetAuthProvider>
      </BrowserRouter>
    );
    expect(screen.getAllByRole("status")).toHaveLength(3);
    await waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument()
    );
    const petCards = screen.getAllByRole("button", { name: /More Info/i });
    expect(petCards).toHaveLength(3);

    const refreshButton = screen.getByRole("button", { name: /refresh/i });
    await user.click(refreshButton);

    await waitFor(() =>
      expect(
        screen.queryByRole("button", { name: /More Info/i })
      ).not.toBeInTheDocument()
    );

    expect(screen.getAllByRole("status")).toHaveLength(3);
    await waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument()
    );
    expect(petCards).toHaveLength(3);
  });

  test("list of Pets renders error", async () => {
    server.use(
      rest.get("https://api.petfinder.com/v2/animals", (_req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ error: "Error" }));
      })
    );

    customRender(
      <BrowserRouter>
        <PetAuthProvider>
          <Home />
        </PetAuthProvider>
      </BrowserRouter>
    );
    expect(screen.getAllByRole("status")).toHaveLength(3);
    await waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument()
    );
    expect(
      screen.getByRole("heading", {
        level: 5,
        name: /Oops! An Error Occurred Getting The Pets/i,
      })
    );
  });
});
