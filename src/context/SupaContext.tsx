import { Context, createContext, useContext, useEffect, useReducer } from "react";
import { useAuthStateChange, useClient } from "react-supabase-next";
import { errorSupa, loadedSupa, loadingSupa, loggedOut, updateAuth, updateProfile } from "reducers/supaFunctions";
import { Props } from "types/types";

import { ISupaState, initialState, supaReducer } from "../reducers/supaReducer";

export const AuthContext: Context<ISupaState> = createContext(initialState);

export function AuthProvider({ children }: Props) {
  const client = useClient();
  const [state, dispatch] = useReducer(supaReducer, initialState);

  const sessionLoad = async () => {
    dispatch(loadingSupa());
    try {
      const session = await client.auth.getSession();
      if (session.data.session?.user?.id) {
        const sessionState = {
          session: session.data.session,
          user: session.data.session?.user ?? null
        };
        dispatch({ type: "UPDATE_AUTH", payload: sessionState });
        const { data, error } = await handleGetUserProfile(session.data.session.user.id);
        if (error) throw error;
        const updatedUserProfile = {
          username: data.username,
          favoritepets: data.favoritepets
        };
        dispatch(updateProfile(updatedUserProfile));
      } else {
        dispatch(loggedOut());
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      dispatch(errorSupa());
    } finally {
      dispatch(loadedSupa());
    }
  };

  const handleGetUserProfile = async (id: string) =>
    await client.from("profiles").select("username, favoritepets(id,pet,created_at)").eq("id", id).single();

  useEffect(() => {
    sessionLoad();
  }, []);

  useAuthStateChange(async (event, session) => {
    if (session?.user?.id) {
      const sessionState = {
        session,
        user: session.user,
        event: event
      };

      dispatch(updateAuth(sessionState));
      try {
        const { data, error } = await handleGetUserProfile(session.user.id);
        if (error) throw error;

        const updatedUserProfile = {
          username: data.username,
          favoritepets: data.favoritepets
        };
        dispatch(updateProfile(updatedUserProfile));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch(errorSupa());
      }
    } else {
      dispatch(loggedOut());
    }
  });

  return <AuthContext.Provider value={{ ...state, dispatch: dispatch }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw Error("useAuth must be used within AuthProvider");
  return context;
}
