import { createContext, useContext, useEffect, useState } from "react";
import { useAuthStateChange, useClient } from "react-supabase";

const initialState = {
  session: null,
  user: null,
  username: "Guest",
  error: null,
  isLoading: false,
};
export const AuthContext = createContext(initialState);

export function AuthProvider({ children }) {
  const client = useClient();
  const [state, setState] = useState(initialState);

  const handleGetUserProfile = (id) =>
    client.from("profiles").select("username").eq("id", id).single();

  const handleUpdateState = (key, value) =>
    setState((prev) => ({ ...prev, [key]: value }));

  const handleUpdateUsername = async (id) => {
    const {
      data: { username },
    } = await handleGetUserProfile(id);
    handleUpdateState("username", username);
  };

  useEffect(() => {
    handleUpdateState("isLoading", true);
    handleUpdateState("error", false);
    try {
      const session = client.auth.session();
      if (session) {
        const { user } = session;
        handleUpdateUsername(user.id);
      } else {
        handleUpdateState("username", "Guest");
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
    let username = "Guest";
    if (session) {
      const { data } = await handleGetUserProfile(session.user.id);
      username = data.username;
    }
    handleUpdateState("username", username);
    handleUpdateState("isLoading", false);
  });
  const changeUserName = (userName) =>
    setState((s) => ({ ...s, username: userName }));
  const value = { ...state, changeUserName: changeUserName };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw Error("useAuth must be used within AuthProvider");
  return context;
}
