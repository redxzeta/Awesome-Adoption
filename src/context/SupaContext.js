import { createContext, useContext, useEffect, useState } from "react";
import { useAuthStateChange, useClient } from "react-supabase";

const initialState = { session: null, user: null, username: null };
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
    const session = client.auth.session();
    if (session) {
      const { user } = session;
      handleUpdateUsername(user.id);
    } else {
      handleUpdateState("username", "Guest");
    }

    setState((prev) => ({ ...prev, session, user: session?.user ?? null }));
  }, []);

  useAuthStateChange(async (event, session) => {
    setState({ session, user: session?.user ?? null, event: event });
    let username = "Guest";
    if (session) {
      const { data } = await handleGetUserProfile(session.user.id);
      username = data.username;
    }
    handleUpdateState("username", username);
  });

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw Error("useAuth must be used within AuthProvider");
  return context;
}
