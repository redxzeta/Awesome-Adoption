import { screen, waitFor } from "@testing-library/react";
import { Provider } from "react-supabase";

import { AuthProvider } from "../../../context/SupaContext";
import PetAuthProvider from "../../../context/TokenContext";
import { customRender } from "../../../swrconfigtest";
import { supabase } from "../../../testServer";
import Favorites from "../Favorites";

describe.skip("Favorites", () => {
  it("should render user favorite pets", async () => {
    customRender(
      <Provider value={supabase}>
        <PetAuthProvider>
          <AuthProvider>
            <Favorites />
          </AuthProvider>
        </PetAuthProvider>
      </Provider>
    );
    expect(screen.getAllByRole("status")).toHaveLength(3);
    await waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument()
    );

    expect(
      screen.getByRole("heading", {
        name: /Start selecting your favorites to find your future best friend!/i,
        level: 5,
      })
    ).toBeInTheDocument();
  });
});
