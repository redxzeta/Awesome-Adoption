import { Session, User } from "@supabase/supabase-js";
import React from "react";

import {
  AddPet,
  ChangeUsername,
  ErrorType,
  LoadedSupa,
  LoadingSupa,
  LoggedOut,
  RemoveFav,
  UpdateAuth,
  UpdateProfile,
} from "./supaActions";

export type FavoritePets = { id: number; pet: string };

export type IProfileUpdate = {
  username: string;
  favoritepets: FavoritePets[];
  id?: string;
};

export type SupaType =
  | { type: LoadingSupa | LoadedSupa | ErrorType | LoggedOut }
  | {
      type: UpdateAuth;
      payload: { session: Session | null; user: User | null };
    }
  | { type: ChangeUsername; payload: string }
  | { type: AddPet; payload: FavoritePets }
  | { type: RemoveFav; payload: number }
  | {
      type: UpdateProfile;
      payload: IProfileUpdate;
    };

export type ISupaState = {
  session: Session | null;
  user: User | null;
  username: string;
  error: boolean;
  isLoading: boolean;
  favoritePets: FavoritePets[];
  dispatch: React.Dispatch<SupaType>;
};

export const initialState: ISupaState = {
  session: null,
  user: null,
  username: "Guest",
  error: false,
  isLoading: false,
  favoritePets: [],
  dispatch: () => undefined,
};

export const supaReducer = (
  state = initialState,
  action: SupaType
): ISupaState => {
  switch (action.type) {
    case "LOADING_SUPA":
      return { ...state, isLoading: true, error: false };
    case "LOADED_SUPA":
      return { ...state, isLoading: false };
    case "ERROR":
      return { ...state, error: true };
    case "UPDATE_AUTH":
      return {
        ...state,
        ...action.payload,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        username: action.payload.username,
        favoritePets: action.payload.favoritepets,
      };
    case "LOGGED_OUT":
      return initialState;
    case "CHANGE_USERNAME":
      return {
        ...state,
        username: action.payload,
      };
    case "ADD_PET":
      return {
        ...state,
        favoritePets: [...state.favoritePets, action.payload],
      };
    case "REMOVE_FAV":
      return {
        ...state,
        favoritePets: state.favoritePets.filter(
          (el) => el.id !== action.payload
        ),
      };

    default:
      return state;
  }
};
