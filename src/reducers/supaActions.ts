const LOADING_SUPA = "LOADING_SUPA";
const LOADED_SUPA = "LOADED_SUPA";
const ERROR = "ERROR";
const UPDATE_AUTH = "UPDATE_AUTH";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const LOGGED_OUT = "LOGGED_OUT";
const CHANGE_USERNAME = "CHANGE_USERNAME";
const ADD_PET = "ADD_PET";
const REMOVE_FAV = "REMOVE_FAV";

export type LoadingSupa = typeof LOADING_SUPA;
export type LoadedSupa = typeof LOADED_SUPA;
export type ErrorType = typeof ERROR;

export type UpdateAuth = typeof UPDATE_AUTH;
export type UpdateProfile = typeof UPDATE_PROFILE;
export type LoggedOut = typeof LOGGED_OUT;
export type ChangeUsername = typeof CHANGE_USERNAME;
export type AddPet = typeof ADD_PET;
export type RemoveFav = typeof REMOVE_FAV;
