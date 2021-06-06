import { cleanup, render, screen } from "@testing-library/react";
import Donate from "../Donate";

import renderer from "react-test-renderer";
import DonateCard from "../DonateCard";
import { BrowserRouter } from "react-router-dom";
afterEach(() => {
  cleanup();
});

test("should render donate component", () => {
  render(<Donate />);
  const donateElement = screen.getByTestId("donate-test-title");
  expect(donateElement).toBeInTheDocument();

  expect(donateElement).toHaveTextContent("DONATE");
});

test("matches donate card snapshot", () => {
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
        <DonateCard ch={sampleData} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
