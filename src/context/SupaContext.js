import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuthStateChange, useClient } from "react-supabase";

import { initialState, supaReducer } from "../reducers/supaReducer";

export const AuthContext = createContext(initialState);

export function AuthProvider({ children }) {
  const client = useClient();

  const [state, dispatch] = useReducer(supaReducer, initialState);

  const dispatchLoadingSupa = () => dispatch({ type: "LOADING_SUPA" });

  const dispatchLoadedSupa = () => dispatch({ type: "LOADED_SUPA" });

  const changeUserName = (userName) =>
    dispatch({ type: "CHANGE_USERNAME", payload: userName });

  const addNewFav = (newFav) => dispatch({ type: "ADD_PET", payload: newFav });

  const removeFavoritePet = (favId) =>
    dispatch({ type: "REMOVE_FAV", payload: favId });

  const sessionLoad = async () => {
    dispatchLoadingSupa();
    try {
      const session = client.auth.session();
      if (session) {
        const sessionState = {
          session,
          user: session?.user ?? null,
        };
        dispatch({ type: "UPDATE_AUTH", payload: sessionState });
        const {
          data: { username, favoritepets },
        } = await handleGetUserProfile(session.user.id);
        dispatch({
          type: "UPDATE_PROFILE",
          payload: { username: username, favoritepets: favoritepets },
        });
      } else {
        dispatch({ type: "LOGGED_OUT" });
      }
    } catch (error) {
      dispatch({ type: "ERROR" });
    } finally {
      dispatchLoadedSupa();
    }
  };

  const handleGetUserProfile = async (id) =>
    await client
      .from("profiles")
      .select("username, favoritepets(id,pet)")
      .eq("id", id)
      .single();

  useEffect(() => {
    sessionLoad();
  }, []);

  useAuthStateChange(async (event, session) => {
    dispatchLoadingSupa();

    if (session) {
      const sessionState = {
        session,
        user: session?.user ?? null,
        event: event,
      };
      dispatch({ type: "UPDATE_AUTH", payload: sessionState });
      const {
        data: { username, favoritepets },
      } = await handleGetUserProfile(session.user.id);
      dispatch({
        type: "UPDATE_PROFILE",
        payload: { username: username, favoritepets: favoritepets },
      });
    } else {
      dispatch({ type: "LOGGED_OUT" });
    }
    dispatchLoadedSupa();
  });

  const value = {
    ...state,
    changeUserName: changeUserName,
    addNewFav: addNewFav,
    removeFavoritePet: removeFavoritePet,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw Error("useAuth must be used within AuthProvider");
  return context;
}
