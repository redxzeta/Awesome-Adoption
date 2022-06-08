import { createClient } from "@supabase/supabase-js";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { ProfileType } from "utils/supaFetcher";

import PlaceImage from "./components/about/__tests__/placeholder50px.png";
import DogSample from "./testData/sample.json";

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

const petList = {
  animal: {
    id: 1,
    url: "https://wwww.mandalorian.com",
    name: "Baby Yoda",
    type: "Grogu",
    contact: {
      email: "yoda@onefor.me",
    },
    breeds: {
      primary: "Grogu",
    },
    colors: {
      primary: "green",
    },
    age: "Baby",
    gender: "male",
    description:
      "He is a toddler member of the same unnamed alien species as the Star Wars characters Yoda and Yaddle, with whom he shares a strong ability in the Force",
    photos: [
      {
        medium: "babyYoda.medium.jpg",
        large: "babyYoda.large.jpg",
      },
    ],
  },
};

const petListFav = [
  {
    animal: {
      id: 2,

      name: "Courage the Cowardly Dog",
      type: "dog",
      age: "Baby",
      gender: "male",
      description: "Woof",
      primary_photo_cropped: {
        medium: "courage.jpg",
      },
      breeds: {
        primary: "dog",
      },
      photos: [
        {
          medium: "courage.medium.jpg",
          large: "courage.large.jpg",
        },
      ],
    },
  },
  {
    animal: {
      id: 3,
      name: "jake",
      type: "dog",
      age: "young",
      gender: "male",
      description: "finns friend",
      primary_photo_cropped: {
        medium: "jake.png",
      },
      breeds: {
        primary: "dog",
      },
      photos: [
        {
          medium: "finn.medium.jpg",
          large: "finn.large.jpg",
        },
      ],
    },
  },
  {
    animal: {
      id: 4,
      name: "puss n boots",
      type: "cat",
      age: "young",
      gender: "male",
      description: "masterr of sowrds",
      primary_photo_cropped: {
        medium: "boots.jpg",
      },
      breeds: {
        primary: "cat",
      },
      photos: [
        {
          medium: "cat.medium.jpg",
          large: "cat.large.jpg",
        },
      ],
    },
  },
];

const server = setupServer(
  rest.get(
    "https://api.github.com/repos/redxzeta/Awesome-Adoption/contributors",
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(contributors));
    }
  ),
  rest.post("https://api.petfinder.com/v2/oauth2/token", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ access_token: "234566" }));
  }),
  rest.get("https://api.petfinder.com/v2/animals/:id", (req, res, ctx) => {
    const { id } = req.params;

    switch (id) {
      case "1":
        return res(ctx.status(200), ctx.json(petList));
      case "2":
        return res(ctx.status(200), ctx.json(petListFav[0]));
      case "3":
        return res(ctx.status(200), ctx.json(petListFav[1]));
      case "4":
        return res(ctx.status(200), ctx.json(petListFav[2]));

      default:
        return res(
          ctx.status(404),
          ctx.json({ message: "Yoda does not exist" })
        );
    }
  }),
  rest.get("https://api.petfinder.com/v2/animals", (req, res, ctx) => {
    const sort = req.url.searchParams.get("sort");
    const limit = req.url.searchParams.get("limit");
    const type = req.url.searchParams.get("type");
    const location = req.url.searchParams.get("location");
    // const page = req.url.searchParams.get("page");
    if (sort === "random" && limit === "1") {
      return res(ctx.status(200), ctx.json(petList));
    } else if (sort === "random" && limit === "3") {
      const threePets = DogSample.animals.slice(0, 3);
      return res(ctx.status(200), ctx.json({ animals: threePets }));
    } else if (type === "dog" && location && limit === "12") {
      return res(ctx.status(200), ctx.json(DogSample));
    }
    return res(ctx.status(200), ctx.json(contributors));
  }),

  // Login
  rest.post("https://test.supabase.co/auth/v1/token", (_req, res, ctx) => {
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
  rest.post("https://test.supabase.co/auth/v1/magicLink", (_req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({ message: "Unable to validate email address: invalid format" })
    );
  }),
  // Register
  rest.post("https://test.supabase.co/auth/v1/signup", (_req, res, ctx) => {
    const fakeNewAccount = {
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
    return res(ctx.status(200), ctx.json(fakeNewAccount));
  }),

  rest.get("https://test.supabase.co/rest/v1/profiles", (_req, res, ctx) => {
    const fakeNewProfile: ProfileType = {
      id: "35",
      username: "SupaAwesome",
      description: "Supa Awesome yet ",
      avatar_url: "cuteDoggoAndCat.jpg",
      favoritepets: [],
      background: {
        id: 1,
        background_url: "someImage.png",
      },
    };
    return res(ctx.status(200), ctx.json(fakeNewProfile));
  }),

  rest.get(
    "https://test.supabase.co/rest/v1/favoritepets",
    (_req, res, ctx) => {
      const fakeNewFavorites = [
        { id: 1, pet: "1" },
        { id: 2, pet: "2" },
      ];
      return res(ctx.status(200), ctx.json(fakeNewFavorites));
    }
  ),

  rest.get(
    "https://test.supabase.co/storage/v1/object/profile/[object%20Object]",
    (_req, res, ctx) => {
      const myBlob = new Blob(
        [
          `/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/
      2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/`,
        ],
        { type: "image/jpeg" }
      );
      return res(ctx.status(200), ctx.json(myBlob));
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
});

const SUPABASE_URL = "https://test.supabase.co";
const KEY = "test";
const supabase = createClient(SUPABASE_URL, KEY);

export { server, rest, supabase };
