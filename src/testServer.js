import { rest } from "msw";
import { setupServer } from "msw/node";
import PlaceImage from "./components/about/__tests__/placeholder50px.png";
import { createClient } from "@supabase/supabase-js";
import { githubURL } from "./routes/API";
const contributors = [
  {
    id: 1,
    login: "abe",
    html_url: "somesite.com",
    avatar_url: PlaceImage,
  },
  {
    id: 2,
    login: "label",
    html_url: "asomesite.com",
    avatar_url: PlaceImage,
  },
];

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

const server = setupServer(
  rest.get(
    "https://api.github.com/repos/redxzeta/Awesome-Adoption/contributors",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(contributors));
    }
  ),
  rest.get("https://api.petfinder.com/v2/animals", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(petList));
  }),
  //Login
  rest.post("https://test.supabase.co/auth/v1/token", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        access_token: "fake_access_token",
        expires_at: 9999999999,
        expires_in: 3600,
        refresh_token: "uCtyqUsj5FJqtIxCkz2Mvg",
        token_type: "bearer",
        user: { id: "1234" },
      })
    );
  }),
  rest.post("https://test.supabase.co/auth/v1/magicLink", (req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({ message: "Unable to validate email address: invalid format" })
    );
  }),
  //Register
  rest.post("https://test.supabase.co/auth/v1/signup", (req, res, ctx) => {
    const fake_new_account = {
      id: "fake_acc_id",
      aud: "authenticated",
      role: "authenticated",
      email: "fake_acc_id@test.com",
      phone: "",
      confirmation_sent_at: Date.now(),
      app_metadata: { provider: "email", providers: ["email"] },
      user_metadata: {},
      identities: [],
      created_at: Date.now(),
      updated_at: Date.now(),
    };
    return res(ctx.status(200), ctx.json(fake_new_account));
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
});

const SUPABASE_URL = "https://test.supabase.co";
const KEY = "test";
const supabase = createClient(SUPABASE_URL, KEY);

export { server, rest, supabase };
