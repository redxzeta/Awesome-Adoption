import { createContext, useContext, useEffect, useState } from "react";
import { useAuthStateChange, useClient } from "react-supabase";

const initialState = { session: null, user: null, username: null };
export const AuthContext = createContext(initialState);

export function AuthProvider({ children }) {
  const client = useClient();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const session = client.auth.session();
    if (session) {
      getProfile(session.user.id);
    } else {
      setState((val) => ({ ...val, username: "Guest" }));
    }
    setState({ ...state, session, user: session?.user ?? null });
  }, []);

  const getProfile = async (id) => {
    const { data } = await client
      .from("profiles")
      .select("username")
      .eq("id", id)
      .single();

    setState((val) => ({ ...val, username: data.username }));
  };
  useAuthStateChange((event, session) => {
    setState({ session, user: session?.user ?? null, event: event });
    if (session) {
      getProfile(session.user.id);
    } else {
      setState((val) => ({ ...val, username: "Guest" }));
    }
  });
  const changeUserName = (userName) =>
    setState((s) => ({ ...s, username: userName }));
  const value = { ...state, changeUserName: changeUserName };
  console.log(state);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw Error("useAuth must be used within AuthProvider");
  return context;
}
