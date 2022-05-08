import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";

import { FavoritePets, SupaType } from "./supaReducer";

export const loadingSupa = (): SupaType => ({ type: "LOADING_SUPA" });
export const loadedSupa = (): SupaType => ({ type: "LOADED_SUPA" });
export const errorSupa = (): SupaType => ({ type: "ERROR" });
export const loggedOut = (): SupaType => ({ type: "LOGGED_OUT" });
export const updateAuth = (sessionState: {
  session: Session;
  user: User;
  event: AuthChangeEvent;
}): SupaType => ({
  type: "UPDATE_AUTH",
  payload: sessionState,
});

export const updateProfile = (profile: {
  username: string;
  favoritepets: FavoritePets[];
}): SupaType => ({
  type: "UPDATE_PROFILE",
  payload: profile,
});

export const changeUserName = (username: string): SupaType => ({
  type: "CHANGE_USERNAME",
  payload: username,
});

export const AddNewFav = (newFav: FavoritePets): SupaType => ({
  type: "ADD_PET",
  payload: newFav,
});

export const removeFavoritePet = (favId: number): SupaType => ({
  type: "REMOVE_FAV",
  payload: favId,
});
