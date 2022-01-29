import { rest } from "msw";
import { setupServer } from "msw/node";
import PlaceImage from "./components/about/__tests__/placeholder50px.png";
import { createClient } from "@supabase/supabase-js";

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

const server = setupServer(
  rest.get(
    "https://api.github.com/repos/redxzeta/Awesome-Adoption/contributors",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(contributors));
    }
  ),
  rest.post("https://api.petfinder.com/v2/oauth2/token", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ access_token: "234566" }));
  }),
  rest.get("https://api.petfinder.com/v2/animals/:id", (req, res, ctx) => {
    const { id } = req.params;
    if (id === "1") {
      return res(ctx.status(200), ctx.json(petList));
    }
    return res(ctx.status(404), ctx.json({ message: "Yoda does not exist" }));
  }),
  rest.get("https://api.petfinder.com/v2/animals", (req, res, ctx) => {
    const sort = req.url.searchParams.get("sort");
    const limit = req.url.searchParams.get("limit");

    if (sort === "random" && limit === "1") {
      return res(ctx.status(200), ctx.json(petList));
    }
    return res(ctx.status(200), ctx.json(contributors));
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
