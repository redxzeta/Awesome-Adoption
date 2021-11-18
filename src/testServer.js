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
const server = setupServer(
  rest.get(
    "https://api.github.com/repos/redxzeta/Awesome-Adoption/contributors",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(contributors));
    }
  ),
  rest.get("https://api.petfinder.com/v2/animals", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(contributors));
  }),
  //Login
  rest.post("https://test.supabase.co/auth/v1/token", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ access_token: "fake_access_token" })
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
