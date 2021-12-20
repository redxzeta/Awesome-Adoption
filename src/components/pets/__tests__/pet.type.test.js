import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PetType from "../PetType";
import userEvent from "@testing-library/user-event";
import { server, rest } from "../../../testServer";
import { fetcher } from "../../../utils/petTypeFetcher";
import { SWRConfig, cache } from "swr";

describe("Test zipcode search", () => {
  test("check init zipcode", async () => {
    render(
      <BrowserRouter>
        <PetType />
      </BrowserRouter>
    );
    const goZip = await screen.findByRole("button", { name: /Go/i });
    expect(goZip).toBeInTheDocument();

    expect(goZip).toBeEnabled();

    const zipForm = screen.getByLabelText(/zipcode/i);
    expect(zipForm).toHaveValue("19019");
  });

  test("no value zipcode disabled", async () => {
    render(
      <BrowserRouter>
        <PetType />
      </BrowserRouter>
    );
    const zipForm = screen.getByLabelText(/zipcode/i);
    userEvent.clear(zipForm);
    expect(zipForm).toHaveValue("");
    const goZip = await screen.findByRole("button", { name: /Go/i });
    expect(goZip).toBeDisabled();
  });
});

// These tests test pet data that have been returned by fetch
describe("Testing API requests with data", () => {
  test("renders pet cards", async () => {
    render(<PetType />);

    const dog1 = await screen.findByText(/Cinnamon/i);
    const dog2 = await screen.findByText(/Rosie/i);
    expect(dog1).toBeInTheDocument();
    expect(dog2).toBeInTheDocument();
  });
});

const AllTheProviders = ({ children }) => {
  return (
    <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
      <BrowserRouter>{children}</BrowserRouter>
    </SWRConfig>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });
