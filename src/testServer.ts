import { createClient } from "@supabase/supabase-js";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { ProfileType } from "utils/supaFetcher";

import PlaceImage from "./components/about/__tests__/placeholder50px.png";
import DogSample from "./testData/sample.json";

const contributors = [
  {
    id: 1,
    login: "abe",
    html_url: "somesite.com",
    avatar_url: PlaceImage
  },
  {
    id: 2,
    login: "label",
    html_url: "asomesite.com",
    avatar_url: PlaceImage
  }
];

const petList = {
  animal: {
    id: 1,
    url: "https://wwww.mandalorian.com",
    name: "Baby Yoda",
    type: "Grogu",
    contact: {
      email: "yoda@onefor.me"
    },
    breeds: {
      primary: "Grogu"
    },
    colors: {
      primary: "green"
    },
    age: "Baby",
    gender: "male",
    description:
      "He is a toddler member of the same unnamed alien species as the Star Wars characters Yoda and Yaddle, with whom he shares a strong ability in the Force",
    photos: [
      {
        medium: "babyYoda.medium.jpg",
        large: "babyYoda.large.jpg"
      }
    ]
  }
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
        medium: "courage.jpg"
      },
      breeds: {
        primary: "dog"
      },
      photos: [
        {
          medium: "courage.medium.jpg",
          large: "courage.large.jpg"
        }
      ]
    }
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
        medium: "jake.png"
      },
      breeds: {
        primary: "dog"
      },
      photos: [
        {
          medium: "finn.medium.jpg",
          large: "finn.large.jpg"
        }
      ]
    }
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
        medium: "boots.jpg"
      },
      breeds: {
        primary: "cat"
      },
      photos: [
        {
          medium: "cat.medium.jpg",
          large: "cat.large.jpg"
        }
      ]
    }
  }
];

const fakenewProfiles: ProfileType[] = [
  {
    id: "35",
    username: "supaAwesome",
    description: "Supa Awesome yet ",
    avatar_url: "cuteDoggoAndCat.jpg",
    favoritepets: [],
    background: {
      id: 1,
      background_url: "someImage.png"
    }
  },
  {
    id: "36",
    username: "supaPet",
    description: "Supa Awesome yet ",
    avatar_url: "cuteDoggoAndCat.jpg",
    favoritepets: [
      { id: 1, pet: "2", created_at: new Date("01/01/2020") },
      { id: 2, pet: "3", created_at: new Date("01/02/2020") }
    ],
    background: {
      id: 1,
      background_url: "someImage.png"
    }
  }
];

const server = setupServer(
  http.get("https://api.github.com/repos/redxzeta/Awesome-Adoption/contributors", () => {
    return HttpResponse.json(contributors, { status: 200 });
  }),
  http.post("https://api.petfinder.com/v2/oauth2/token", () => {
    return HttpResponse.json({ access_token: "234566" }, { status: 200 });
  }),
  http.get("https://api.petfinder.com/v2/animals/:id", info => {
    const { id } = info.params;

    switch (id) {
      case "1":
        return HttpResponse.json(petList, { status: 200 });
      case "2":
        return HttpResponse.json(petListFav[0], { status: 200 });
      case "3":
        return HttpResponse.json(petListFav[1], { status: 200 });
      case "4":
        return HttpResponse.json(petListFav[2], { status: 200 });
      default:
        return HttpResponse.json({ message: "Yoda does not exist" }, { status: 404 });
    }
  }),
  http.get("https://api.petfinder.com/v2/animals", ({ request }) => {
    const url = new URL(request.url);
    const sort = url.searchParams.get("sort");
    const limit = url.searchParams.get("limit");
    const type = url.searchParams.get("type");
    const location = url.searchParams.get("location");
    // const page = info.url.searchParams.get("page");
    if (sort === "random" && limit === "1") {
      return HttpResponse.json(petList, { status: 200 });
    } else if (sort === "random" && limit === "3") {
      const threePets = DogSample.animals.slice(0, 3);
      return HttpResponse.json({ animals: threePets }, { status: 200 });
    } else if (type === "dog" && location && limit === "12") {
      return HttpResponse.json(DogSample, { status: 200 });
    }
    return HttpResponse.json(contributors, { status: 200 });
  }),

  // Login
  http.post("https://test.supabase.co/auth/v1/token", () => {
    return HttpResponse.json(
      {
        access_token: "fake_access_token",
        expires_at: 9999999999,
        expires_in: 3600,
        refresh_token: "uCtyqUsj5FJqtIxCkz2Mvg",
        token_type: "bearer",
        user: { id: "1234" }
      },
      { status: 200 }
    );
  }),
  http.post("https://test.supabase.co/auth/v1/magicLink", () => {
    return HttpResponse.json({ message: "Unable to validate email address: invalid format" }, { status: 400 });
  }),
  // Register
  http.post("https://test.supabase.co/auth/v1/signup", () => {
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
      updated_at: Date.now()
    };
    return HttpResponse.json(fakeNewAccount, { status: 200 });
  }),

  http.get("https://test.supabase.co/rest/v1/profiles", ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get("username")?.replace("eq.", "");
    switch (name) {
      case "supaAwesome":
        return HttpResponse.json(fakenewProfiles[0], { status: 200 });
      case "supaPet":
        return HttpResponse.json(fakenewProfiles[1], { status: 200 });
      default:
        return HttpResponse.json({ message: "ERROR" }, { status: 404 });
    }
  }),

  http.get("https://test.supabase.co/rest/v1/favoritepets", () => {
    const fakeNewFavorites = [
      { id: 1, pet: "1" },
      { id: 2, pet: "2" }
    ];
    return HttpResponse.json(fakeNewFavorites, { status: 200 });
  }),

  http.get("https://test.supabase.co/storage/v1/object/profile/[object%20Object]", () => {
    const myBlob = new Blob(
      [
        `/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/
      2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/`
      ],
      { type: "image/jpeg" }
    );
    return HttpResponse.json(myBlob, { status: 200 });
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
});

const SUPABASE_URL = "https://test.supabase.co";
const KEY = "test";
const supabase = createClient(SUPABASE_URL, KEY);

export { server, http, supabase };
