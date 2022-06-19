import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import Organizations from "../Organizations";
import OrganizationsCard from "../OrganizationsCard";

test("should render organizations component", () => {
  render(<Organizations />);
  const donateElement = screen.getByTestId("donate-test-title");
  expect(donateElement).toBeInTheDocument();

  expect(donateElement).toHaveTextContent("ORGANIZATIONS");
});

test("matches organizations card snapshot", () => {
  const sampleData = {
    name: "Lorem Charity",
    website: "https://via.placeholder.com/",
    logo: "https://via.placeholder.com/150",
    location: "Lorem States",
    founded: 9000,
    mission: "Peace of Lorem",
  };
  const tree = renderer
    .create(
      <BrowserRouter>
        <OrganizationsCard ch={sampleData} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Test for filtering", async () => {
  render(<Organizations />);
  const user = userEvent.setup();
  const locationDropdown = screen.getByLabelText(/Filter by place:/i);
  await user.selectOptions(locationDropdown, "united states");

  expect(
    screen.getByRole("option", {
      name: "united states",
    }).selected
  ).toBe(true);

  expect(
    screen.queryByRole("option", {
      name: "india",
    }).selected
  ).toBe(false);

  expect(
    screen.queryByText(/^Location: ((?!United States).)*$/i)
  ).not.toBeInTheDocument();

  expect(
    screen.queryAllByText(/^Location: United States$/i).length
  ).toBeGreaterThan(0);

  expect(
    screen.getByRole("option", { name: "united states" })
  ).toBeInTheDocument();

  expect(screen.getAllByRole("option").length).toBe(11);
});
