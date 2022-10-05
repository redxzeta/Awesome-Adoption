import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Organizations from "../Organizations";

describe("Organizations", () => {
  test("should render organizations component", () => {
    render(<Organizations />);
    expect(
      screen.getByRole("heading", { name: /organizations/i })
    ).toBeInTheDocument();
  });

  test("Test for filtering", async () => {
    render(<Organizations />);
    const user = userEvent.setup();
    const locationDropdown = screen.getByLabelText(/Filter by place:/i);
    await user.selectOptions(locationDropdown, "united states");

    expect(
      (
        screen.getByRole("option", {
          name: "united states",
        }) as HTMLOptionElement
      ).selected
    ).toBeTruthy();

    expect(
      (
        screen.queryByRole("option", {
          name: "india",
        }) as HTMLOptionElement
      ).selected
    ).toBe(false);

    expect(
      screen.queryByText(/^Location: ((?!United States).)*$/i)
    ).not.toBeInTheDocument();

    expect(
      screen.queryAllByText(/^Location: United States /i).length
    ).toBeGreaterThan(0);

    expect(
      screen.getByRole("option", { name: "united states" })
    ).toBeInTheDocument();

    expect(screen.getAllByRole("option").length).toBe(11);
  });
});
