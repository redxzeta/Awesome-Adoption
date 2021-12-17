import { cleanup, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import Home from "../Home";
import React from "react";
import { fetcher } from "../../../utils/homePageFetcher";

afterEach(() => {
  cleanup();
});

// mock pet list
const petList = [
  {
    id: 53910428,
    organization_id: "MI299",
    url: "https://www.petfinder.com/dog/harley-53910428/mi/allegan/allegan-county-animal-shelter-operated-by-wishbone-pet-rescue-alliance-mi299/?referrer_id=fb5d8374-0e7d-46e3-9214-3d9b8f6ba774",
    type: "Dog",
    species: "Dog",
    breeds: {
      primary: "Labrador Retriever",
      secondary: null,
      mixed: false,
      unknown: false,
    },
    colors: {
      primary: "Black",
      secondary: null,
      tertiary: null,
    },
    age: "Senior",
    gender: "Male",
    size: "Large",
    coat: "Short",
    attributes: {
      spayed_neutered: true,
      house_trained: false,
      declawed: null,
      special_needs: false,
      shots_current: true,
    },
    environment: {
      children: true,
      dogs: true,
      cats: true,
    },
    tags: [],
    name: "Harley",
    description:
      "Hi everyone! My name is Harley. I would like a home where kids are 6 and up. I did not...",
    organization_animal_id: null,
    photos: [
      {
        small:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/1/?bust=1639594992&width=100",
        medium:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/1/?bust=1639594992&width=300",
        large:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/1/?bust=1639594992&width=600",
        full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/1/?bust=1639594992",
      },
      {
        small:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/2/?bust=1639594993&width=100",
        medium:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/2/?bust=1639594993&width=300",
        large:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/2/?bust=1639594993&width=600",
        full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/2/?bust=1639594993",
      },
      {
        small:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/3/?bust=1639594993&width=100",
        medium:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/3/?bust=1639594993&width=300",
        large:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/3/?bust=1639594993&width=600",
        full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/3/?bust=1639594993",
      },
      {
        small:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/4/?bust=1639594994&width=100",
        medium:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/4/?bust=1639594994&width=300",
        large:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/4/?bust=1639594994&width=600",
        full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/4/?bust=1639594994",
      },
      {
        small:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/5/?bust=1639594995&width=100",
        medium:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/5/?bust=1639594995&width=300",
        large:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/5/?bust=1639594995&width=600",
        full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/5/?bust=1639594995",
      },
      {
        small:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/6/?bust=1639594995&width=100",
        medium:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/6/?bust=1639594995&width=300",
        large:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/6/?bust=1639594995&width=600",
        full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/6/?bust=1639594995",
      },
    ],
    primary_photo_cropped: {
      small:
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/1/?bust=1639594992&width=300",
      medium:
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/1/?bust=1639594992&width=450",
      large:
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/1/?bust=1639594992&width=600",
      full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53910428/1/?bust=1639594992",
    },
    videos: [],
    status: "adoptable",
    status_changed_at: "2021-12-15T19:03:17+0000",
    published_at: "2021-12-15T19:03:17+0000",
    distance: null,
    contact: {
      email: "shelter@wishbonepetrescue.org",
      phone: "(269) 686-5112 ext. 0",
      address: {
        address1: "2293 33rd Street",
        address2: null,
        city: "Allegan",
        state: "MI",
        postcode: "49010",
        country: "US",
      },
    },
    _links: {
      self: {
        href: "/v2/animals/53910428",
      },
      type: {
        href: "/v2/types/dog",
      },
      organization: {
        href: "/v2/organizations/mi299",
      },
    },
  },
  {
    id: 53922194,
    organization_id: "TX973",
    url: "https://www.petfinder.com/dog/israel-53922194/tx/houston/city-of-houston-barc-animal-shelter-and-adoptions-tx973/?referrer_id=fb5d8374-0e7d-46e3-9214-3d9b8f6ba774",
    type: "Dog",
    species: "Dog",
    breeds: {
      primary: "Labrador Retriever",
      secondary: "Mixed Breed",
      mixed: true,
      unknown: false,
    },
    colors: {
      primary: null,
      secondary: null,
      tertiary: null,
    },
    age: "Baby",
    gender: "Male",
    size: "Small",
    coat: null,
    attributes: {
      spayed_neutered: false,
      house_trained: false,
      declawed: null,
      special_needs: false,
      shots_current: false,
    },
    environment: {
      children: null,
      dogs: null,
      cats: null,
    },
    tags: [],
    name: "ISRAEL",
    description: null,
    organization_animal_id: "A1798345",
    photos: [
      {
        small:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53922194/1/?bust=1639698824&width=100",
        medium:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53922194/1/?bust=1639698824&width=300",
        large:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53922194/1/?bust=1639698824&width=600",
        full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53922194/1/?bust=1639698824",
      },
    ],
    primary_photo_cropped: {
      small:
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53922194/1/?bust=1639698824&width=300",
      medium:
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53922194/1/?bust=1639698824&width=450",
      large:
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53922194/1/?bust=1639698824&width=600",
      full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53922194/1/?bust=1639698824",
    },
    videos: [],
    status: "adoptable",
    status_changed_at: "2021-12-16T19:59:19+0000",
    published_at: "2021-12-16T19:59:19+0000",
    distance: null,
    contact: {
      email: "BARCAdoptions@houstontx.gov",
      phone: "(713) 837-0311",
      address: {
        address1: "3300 Carr Street (Front Entrance)",
        address2: "2700 Evella Street (Rear Entrance)",
        city: "Houston",
        state: "TX",
        postcode: "77026",
        country: "US",
      },
    },
    _links: {
      self: {
        href: "/v2/animals/53922194",
      },
      type: {
        href: "/v2/types/dog",
      },
      organization: {
        href: "/v2/organizations/tx973",
      },
    },
  },
  {
    id: 53305470,
    organization_id: "AZ715",
    url: "https://www.petfinder.com/dog/andy-and-mandy-53305470/az/mesa/angels-for-paws-animal-rescue-az715/?referrer_id=fb5d8374-0e7d-46e3-9214-3d9b8f6ba774",
    type: "Dog",
    species: "Dog",
    breeds: {
      primary: "Chihuahua",
      secondary: null,
      mixed: false,
      unknown: false,
    },
    colors: {
      primary: "Apricot / Beige",
      secondary: null,
      tertiary: null,
    },
    age: "Senior",
    gender: "Male",
    size: "Small",
    coat: "Medium",
    attributes: {
      spayed_neutered: true,
      house_trained: true,
      declawed: null,
      special_needs: false,
      shots_current: true,
    },
    environment: {
      children: null,
      dogs: true,
      cats: true,
    },
    tags: [
      "Friendly",
      "Gentle",
      "Quiet",
      "Couch potato",
      "Affectionate",
      "Curious",
    ],
    name: "Andy & Mandy",
    description:
      "Andy &amp; Mandy are a sister/brother bonded pair.  They are 13 years old and looking for a calm and quiet...",
    organization_animal_id: null,
    photos: [
      {
        small:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/1/?bust=1634610254&width=100",
        medium:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/1/?bust=1634610254&width=300",
        large:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/1/?bust=1634610254&width=600",
        full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/1/?bust=1634610254",
      },
      {
        small:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/2/?bust=1634610255&width=100",
        medium:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/2/?bust=1634610255&width=300",
        large:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/2/?bust=1634610255&width=600",
        full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/2/?bust=1634610255",
      },
      {
        small:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/3/?bust=1634610256&width=100",
        medium:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/3/?bust=1634610256&width=300",
        large:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/3/?bust=1634610256&width=600",
        full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/3/?bust=1634610256",
      },
      {
        small:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/4/?bust=1634610257&width=100",
        medium:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/4/?bust=1634610257&width=300",
        large:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/4/?bust=1634610257&width=600",
        full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/4/?bust=1634610257",
      },
    ],
    primary_photo_cropped: {
      small:
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/1/?bust=1634610254&width=300",
      medium:
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/1/?bust=1634610254&width=450",
      large:
        "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/1/?bust=1634610254&width=600",
      full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53305470/1/?bust=1634610254",
    },
    videos: [],
    status: "adoptable",
    status_changed_at: "2021-10-19T02:25:13+0000",
    published_at: "2021-10-19T02:25:13+0000",
    distance: null,
    contact: {
      email: "monica@angelsforpaws.org",
      phone: "(949) 637-4326",
      address: {
        address1: null,
        address2: null,
        city: "Mesa",
        state: "AZ",
        postcode: "85205",
        country: "US",
      },
    },
    _links: {
      self: {
        href: "/v2/animals/53305470",
      },
      type: {
        href: "/v2/types/dog",
      },
      organization: {
        href: "/v2/organizations/az715",
      },
    },
  },
];

jest.mock("../../../utils/homePageFetcher");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
}));

// These tests test pet list that have been returned by fetch
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
    const { findByTestId } = customRender(<Home onClick={mutate()} />);
    const button = await findByTestId("btn-refresh");
    fireEvent.click(button);
    expect(mutate).toHaveBeenCalledTimes(1);
  });
});

// These tests test empty pet list that have been returned by fetch
describe("Testing home with empty pet list", () => {
  beforeEach(async () => {
    fetcher.mockReturnValue();
  });

  test("Empty pet list should display an error message", async () => {
    const { findByText } = customRender(<Home />);
    const element = await findByText(
      /Oops! An Error Occurred Getting The Pets/i
    );
    expect(element).toBeInTheDocument();
  });
});

// These tests errors with fetch
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
