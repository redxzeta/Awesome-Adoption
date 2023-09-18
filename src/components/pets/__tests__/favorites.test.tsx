import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-supabase";
import { FavoritePets, ISupaState } from "reducers/supaReducer";

import { AuthContext, AuthProvider } from "../../../context/SupaContext";
import PetAuthProvider, {
  PetAuthContext,
  PetTokenType
} from "../../../context/TokenContext";
import { customRender } from "../../../swrconfigtest";
import { supabase } from "../../../testServer";
import Favorites from "../Favorites";

describe("Favorites", () => {
  it("should render no favorite pets", async () => {
    customRender(
      <Provider value={supabase}>
        <PetAuthProvider>
          <AuthProvider>
            <Favorites />
          </AuthProvider>
        </PetAuthProvider>
      </Provider>
    );

    expect(
      screen.getByRole("heading", {
        name: /Start selecting your favorites to find your future best friend!/i,
        level: 5
      })
    ).toBeInTheDocument();
  });

  it("should render user favorited pets", async () => {
    const start: Date = new Date();
    const favoritePets: FavoritePets[] = [
      {
        id: 50,
        pet: "2",
        created_at: start
      },
      {
        id: 51,
        pet: "3",
        created_at: start
      },
      {
        id: 52,
        pet: "4",
        created_at: start
      }
    ];
    const supaInitialState = {
      favoritePets: favoritePets
    } as ISupaState;
    const initialState: PetTokenType = {
      tokenHeaders: "yayeet",
      loading: false,
      errors: false
    };
    customRender(
      <BrowserRouter>
        <Provider value={supabase}>
          <PetAuthContext.Provider value={initialState}>
            <AuthContext.Provider
              value={{ ...supaInitialState, dispatch: () => undefined }}
            >
              <Favorites />
            </AuthContext.Provider>
          </PetAuthContext.Provider>
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getAllByRole("status")).toHaveLength(3);
    await waitFor(() =>
      expect(screen.queryAllByRole("status")).not.toHaveLength(3)
    );
    const petCards = screen.getAllByRole("button", { name: /More Info/i });
    expect(petCards).toHaveLength(3);
  });
});

test.skip("test remove button", async () => {
  const start: Date = new Date();
  const favoritePets: FavoritePets[] = [
    {
      id: 50,
      pet: "2",
      created_at: start
    },
    {
      id: 51,
      pet: "3",
      created_at: start
    },
    {
      id: 52,
      pet: "4",
      created_at: start
    }
  ];
  const supaInitialState = {
    favoritePets: favoritePets
  } as ISupaState;
  const initialState: PetTokenType = {
    tokenHeaders: "yayeet",
    loading: false,
    errors: false
  };
  customRender(
    <BrowserRouter>
      <Provider value={supabase}>
        <PetAuthContext.Provider value={initialState}>
          <AuthContext.Provider
            value={{ ...supaInitialState, dispatch: () => undefined }}
          >
            <Favorites />
          </AuthContext.Provider>
        </PetAuthContext.Provider>
      </Provider>
    </BrowserRouter>
  );

  const user = userEvent.setup();

  expect(screen.getAllByRole("status")).toHaveLength(3);
  await waitFor(() =>
    expect(screen.queryAllByRole("status")).not.toHaveLength(3)
  );
  const rmvButton = screen.getAllByRole("button", { name: /Remove/i });
  expect(rmvButton).toHaveLength(3);
  await user.click(rmvButton[0]);
  const loadingBtn = screen.getAllByRole("button", { name: "Loading" });
  expect(loadingBtn).toHaveLength(3);
  await waitFor(() =>
    expect(
      screen.queryAllByRole("button", { name: "Loading" })
    ).not.toHaveLength(3)
  );
  expect(screen.getAllByRole("button", { name: /Remove/i })).toHaveLength(3);
  await waitFor(() =>
    expect(
      screen.queryAllByRole("button", { name: /Remove/i })
    ).not.toHaveLength(3)
  );
});
