import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import Home from "../Home";
import React from "react";
import { server, rest } from "../../../testServer";
import { fetcher } from "../../../utils/homePageFetcher";

// mock pet list
const petList = [
  {
    id: 53910428,
    url: "https://www.petfinder.com/dog/harley-53910428/mi/allegan/allegan-county-animal-shelter-operated-by-wishbone-pet-rescue-alliance-mi299/?referrer_id=fb5d8374-0e7d-46e3-9214-3d9b8f6ba774",
    type: "Dog",
    species: "Dog",
    breeds: {
      primary: "Labrador Retriever",
      secondary: null,
      mixed: false,
      unknown: false,
    },
    name: "Harley",
    primary_photo_cropped: {
      small:
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/1/?bust=1639594992&width=300",
      medium:
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/1/?bust=1639594992&width=450",
      large:
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/1/?bust=1639594992&width=600",
      full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/1/?bust=1639594992",
    },
  },
  {
    id: 53922194,
    url: "https://www.petfinder.com/dog/israel-53922194/tx/houston/city-of-houston-barc-animal-shelter-and-adoptions-tx973/?referrer_id=fb5d8374-0e7d-46e3-9214-3d9b8f6ba774",
    type: "Dog",
    species: "Dog",
    breeds: {
      primary: "Labrador Retriever",
      secondary: "Mixed Breed",
    },
    tags: [],
    name: "ISRAEL",
    primary_photo_cropped: {
      small:
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53922194/1/?bust=1639698824&width=300",
      medium:
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53922194/1/?bust=1639698824&width=450",
      large:
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53922194/1/?bust=1639698824&width=600",
      full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53922194/1/?bust=1639698824",
    },
  },
  {
    id: 53305470,
    url: "https://www.petfinder.com/dog/andy-and-mandy-53305470/az/mesa/angels-for-paws-animal-rescue-az715/?referrer_id=fb5d8374-0e7d-46e3-9214-3d9b8f6ba774",
    type: "Dog",
    species: "Dog",
    breeds: {
      primary: "Chihuahua",
      secondary: null,
    },
    name: "Andy & Mandy",
    primary_photo_cropped: {
      small:
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/1/?bust=1634610254&width=300",
      medium:
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/1/?bust=1634610254&width=450",
      large:
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/1/?bust=1634610254&width=600",
      full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/1/?bust=1634610254",
    },
  },
];

jest.mock("../../../utils/homePageFetcher");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
}));

describe("Testing pet list with mock list", () => {
  beforeEach(async () => {
    fetcher.mockReturnValue(petList);
  });

  test("list of Pets renders correctly", async () => {
    const { findByText } = customRender(<Home />);
    const namePet1 = await findByText(/Harley/i);
    expect(namePet1).toBeInTheDocument();

    const namePet2 = await findByText(/ISRAEL/i);
    expect(namePet2).toBeInTheDocument();

    const namePet3 = await findByText(/Andy & Mandy/i);
    expect(namePet3).toBeInTheDocument();
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
});

describe("Testing home with empty pet list", () => {
  beforeEach(async () => {
    fetcher.mockReturnValue();
  });

  test("Empty pet list should display a loading label", async () => {
    const { findByText } = customRender(<Home />);
    const element = await findByText(/Loading.../i);
    expect(element).toBeInTheDocument();
  });
});

describe("Testing errors", () => {
  beforeEach(async () => {
    fetcher.mockImplementation(() => {
      throw new Error();
    });
  });

  test("Error fetching the pet list should display a message", async () => {
    const { findByText } = customRender(<Home />);
    const element = await findByText(
      /Oops! An Error Occurred Getting The Pets/i
    );
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
