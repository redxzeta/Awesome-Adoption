// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LOADING_SUPA = "LOADING_SUPA";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LOADED_SUPA = "LOADED_SUPA";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ERROR = "ERROR";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UPDATE_AUTH = "UPDATE_AUTH";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UPDATE_PROFILE = "UPDATE_PROFILE";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LOGGED_OUT = "LOGGED_OUT";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CHANGE_USERNAME = "CHANGE_USERNAME";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ADD_PET = "ADD_PET";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
