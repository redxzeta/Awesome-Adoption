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

const fake_animal_type_list = {
  animals: [
    {
      id: 53957027,
      organization_id: "PA882",
      url: "https://www.petfinder.com/dog/cinnamon-53957027/pa/malvern/justice-rescue-pa882/?referrer_id=fb5d8374-0e7d-46e3-9214-3d9b8f6ba774",
      type: "Dog",
      species: "Dog",
      breeds: {
        primary: "Collie",
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
      gender: "Female",
      size: "Medium",
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
      name: "Cinnamon",
      description: null,
      organization_animal_id: "49153710",
      photos: [
        {
          small:
            "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957027/1/?bust=1639966618&width=100",
          medium:
            "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957027/1/?bust=1639966618&width=300",
          large:
            "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957027/1/?bust=1639966618&width=600",
          full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957027/1/?bust=1639966618",
        },
        {
          small:
            "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957027/2/?bust=1639966611&width=100",
          medium:
            "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957027/2/?bust=1639966611&width=300",
          large:
            "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957027/2/?bust=1639966611&width=600",
          full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957027/2/?bust=1639966611",
        },
      ],
      primary_photo_cropped: {
        small:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957027/1/?bust=1639966618&width=300",
        medium:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957027/1/?bust=1639966618&width=450",
        large:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957027/1/?bust=1639966618&width=600",
        full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957027/1/?bust=1639966618",
      },
      videos: [],
      status: "adoptable",
      status_changed_at: "2021-12-20T02:06:35+0000",
      published_at: "2021-12-20T02:06:35+0000",
      distance: 21.0838,
      contact: {
        email: "adopt@justice-rescue.com",
        phone: "(952) 688-2621",
        address: {
          address1: null,
          address2: null,
          city: "Malvern",
          state: "PA",
          postcode: "19355",
          country: "US",
        },
      },
      _links: {
        self: {
          href: "/v2/animals/53957027",
        },
        type: {
          href: "/v2/types/dog",
        },
        organization: {
          href: "/v2/organizations/pa882",
        },
      },
    },
    {
      id: 53957022,
      organization_id: "PA678",
      url: "https://www.petfinder.com/dog/rosie-53957022/pa/chester-springs/all-4-paws-rescue-pa678/?referrer_id=fb5d8374-0e7d-46e3-9214-3d9b8f6ba774",
      type: "Dog",
      species: "Dog",
      breeds: {
        primary: "Yorkshire Terrier",
        secondary: null,
        mixed: false,
        unknown: false,
      },
      colors: {
        primary: null,
        secondary: null,
        tertiary: null,
      },
      age: "Adult",
      gender: "Female",
      size: "Small",
      coat: null,
      attributes: {
        spayed_neutered: true,
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
      name: "Rosie",
      description:
        "Rosie is a 8.5 year old spayed female Yorkshire Terrier who weighs 7 lbs. Rosie came to All 4 Paws...",
      organization_animal_id: "49255205",
      photos: [
        {
          small:
            "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957022/1/?bust=1639966610&width=100",
          medium:
            "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957022/1/?bust=1639966610&width=300",
          large:
            "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957022/1/?bust=1639966610&width=600",
          full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957022/1/?bust=1639966610",
        },
        {
          small:
            "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957022/2/?bust=1639966603&width=100",
          medium:
            "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957022/2/?bust=1639966603&width=300",
          large:
            "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957022/2/?bust=1639966603&width=600",
          full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957022/2/?bust=1639966603",
        },
        {
          small:
            "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957022/3/?bust=1639966599&width=100",
          medium:
            "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957022/3/?bust=1639966599&width=300",
          large:
            "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957022/3/?bust=1639966599&width=600",
          full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957022/3/?bust=1639966599",
        },
      ],
      primary_photo_cropped: {
        small:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957022/1/?bust=1639966610&width=300",
        medium:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957022/1/?bust=1639966610&width=450",
        large:
          "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957022/1/?bust=1639966610&width=600",
        full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53957022/1/?bust=1639966610",
      },
      videos: [],
      status: "adoptable",
      status_changed_at: "2021-12-20T02:06:31+0000",
      published_at: "2021-12-20T02:06:31+0000",
      distance: 28.5974,
      contact: {
        email: "info@all4pawsrescue.com",
        phone: "(610) 731-1086",
        address: {
          address1: null,
          address2: null,
          city: "Chester Springs",
          state: "PA",
          postcode: "19425",
          country: "US",
        },
      },
      _links: {
        self: {
          href: "/v2/animals/53957022",
        },
        type: {
          href: "/v2/types/dog",
        },
        organization: {
          href: "/v2/organizations/pa678",
        },
      },
    },
  ],
  pagination: {
    count_per_page: 12,
    total_count: 5668,
    current_page: 1,
    total_pages: 473,
    _links: {
      next: {
        href: "/v2/animals?limit=12&location=19019&page=2&type=dog",
      },
    },
  },
};
// Setting up the msw server
const server = setupServer(
  rest.get(
    "https://api.github.com/repos/redxzeta/Awesome-Adoption/contributors",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(contributors));
    }
  ),
  rest.get(
    "https://api.petfinder.com/v2/animalstype=:type&location=:location&limit=12&page=:page",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(fake_animal_type_list));
    }
  ),
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
