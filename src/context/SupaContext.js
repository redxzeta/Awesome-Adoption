import { createContext, useContext, useEffect, useState } from "react";
import { useAuthStateChange, useClient } from "react-supabase";

const initialState = {
  session: null,
  user: { id: null },
  username: "Guest",
  error: null,
  isLoading: false,
  favoritePets: [],
};
export const AuthContext = createContext(initialState);

export function AuthProvider({ children }) {
  const client = useClient();
  const [state, setState] = useState(initialState);

  const handleGetUserProfile = (id) =>
    client
      .from("profiles")
      .select("username, favoritepets(id,pet)")
      .eq("id", id)
      .single();

  const handleUpdateState = (key, value) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const handleUpdateProfile = async (id) => {
    const {
      data: { username, favoritepets },
    } = await handleGetUserProfile(id);

    handleUpdateState("username", username);
    handleUpdateState("favoritePets", favoritepets);
  };

  useEffect(() => {
    handleUpdateState("isLoading", true);
    handleUpdateState("error", false);
    try {
      const session = client.auth.session();
      if (session) {
        const { user } = session;
        handleUpdateProfile(user.id);
      } else {
        handleUpdateState("username", "Guest");
        handleUpdateState("favoritePets", []);
      }

      setState((prev) => ({ ...prev, session, user: session?.user ?? null }));
    } catch (error) {
      handleUpdateState("error", true);
    } finally {
      handleUpdateState("isLoading", false);
    }
  }, []);

  useAuthStateChange(async (event, session) => {
    handleUpdateState("isLoading", true);
    setState({ session, user: session?.user ?? null, event: event });

    if (session) {
      await handleUpdateProfile(session.user.id);
    } else {
      handleUpdateState("username", "Guest");
      handleUpdateState("favoritePets", []);
    }
  });
  const changeUserName = (userName) =>
    setState((s) => ({ ...s, username: userName }));

  const addNewFav = (newFav) =>
    setState((s) => ({ ...s, favoritePets: [...s.favoritePets, newFav] }));

  const removeFav = (favId) =>
    setState((s) => ({
      ...s,
      favoritePets: state.favoritePets.filter((el) => el.id !== favId),
    }));

  const value = {
    ...state,
    changeUserName: changeUserName,
    addNewFav: addNewFav,
    removeFav,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw Error("useAuth must be used within AuthProvider");
  return context;
}
