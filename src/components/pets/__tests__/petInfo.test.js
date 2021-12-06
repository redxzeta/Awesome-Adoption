import { cleanup, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import PetInfo from "../PetInfo";
import React from "react";
import { fetcher } from "../../../utils/petInfoFetcher";

afterEach(() => {
  cleanup();
});

// mock pet data
const petData = {
  animal: {
    id: 124,
    organization_id: "NJ333",
    url: "https://www.petfinder.com/cat/nebula-124/nj/jersey-city/nj333-petfinder-test-account/?referrer_id=d7e3700b-2e07-11e9-b3f3-0800275f82b1",
    type: "Cat",
    species: "Cat",
    breeds: {
      primary: "American Shorthair",
      secondary: null,
      mixed: false,
      unknown: false,
    },
    colors: {
      primary: "Tortoiseshell",
      secondary: null,
      tertiary: null,
    },
    age: "Young",
    gender: "Female",
    size: "Medium",
    coat: "Short",
    name: "Nebula",
    description:
      "Nebula is a shorthaired, shy cat. She is very affectionate once she warms up to you.",
    photos: [
      {
        small:
          "https://photos.petfinder.com/photos/pets/124/1/?bust=1546042081&width=100",
        medium:
          "https://photos.petfinder.com/photos/pets/124/1/?bust=1546042081&width=300",
        large:
          "https://photos.petfinder.com/photos/pets/124/1/?bust=1546042081&width=600",
        full: "https://photos.petfinder.com/photos/pets/124/1/?bust=1546042081",
      },
    ],
    videos: [
      {
        embed:
          '<iframe src="https://www.youtube.com/embed/xaXbs1fRFRM" frameborder="0" allowfullscreen></iframe>',
      },
    ],
    status: "adoptable",
    attributes: {
      spayed_neutered: true,
      house_trained: true,
      declawed: false,
      special_needs: false,
      shots_current: true,
    },
    environment: {
      children: false,
      dogs: true,
      cats: true,
    },
    tags: ["Cute", "Intelligent", "Playful", "Happy", "Affectionate"],
    contact: {
      email: "petfindertechsupport@gmail.com",
      phone: "555-555-5555",
      address: {
        address1: null,
        address2: null,
        city: "Jersey City",
        state: "NJ",
        postcode: "07097",
        country: "US",
      },
    },
    published_at: "2018-09-04T14:49:09+0000",
    distance: null,
    _links: {
      self: {
        href: "/v2/animals/124",
      },
      type: {
        href: "/v2/types/cat",
      },
      organization: {
        href: "/v2/organizations/nj333",
      },
    },
  },
};

jest.mock("../../../utils/petInfoFetcher");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "124",
  }),
}));

// These tests test pet data that have been returned by fetch
describe("Testing animal with data", () => {
  beforeEach(async () => {
    fetcher.mockReturnValue(petData.animal);
  });

  test("Animal data renders correctly", async () => {
    const { findByText } = customRender(<PetInfo />);
    const element = await findByText(/Name - Nebula/i);
    expect(element).toBeInTheDocument();
  });

  test("calls handleShare when share button is clicked", async () => {
    const handleShare = jest.fn();
    const { findByTestId } = customRender(<PetInfo onClick={handleShare()} />);
    const button = await findByTestId("btn-share");
    fireEvent.click(button);
    expect(handleShare).toHaveBeenCalledTimes(1);
  });
});

// These tests test empty pet data that have been returned by fetch
describe("Testing pet with empty data", () => {
  beforeEach(async () => {
    fetcher.mockReturnValue({});
  });

  test("Empty pet data will display 'No pet data'", async () => {
    const { findByText } = customRender(<PetInfo />);
    const element = await findByText(/No pet data/i);
    expect(element).toBeInTheDocument();
  });
});

// These tests errors with fetch
describe("Testing error", () => {
  beforeEach(async () => {
    fetcher.mockImplementation(() => {
      throw new Error();
    });
  });

  test("'error from fetch will display 'An Error Occurred' message", async () => {
    const { findByText } = customRender(<PetInfo />);
    const element = await findByText(/An Error Occurred/i);
    expect(element).toBeInTheDocument();
  });
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
