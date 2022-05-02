export const initialState = {
  session: null,
  user: { id: null },
  username: "Guest",
  error: null,
  isLoading: false,
  favoritePets: [],
};

export const supaReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOADING_SUPA":
      return { ...state, isLoading: true, error: null };
    case "LOADED_SUPA":
      return { ...state, isLoading: false };
    case "ERROR":
      return { ...state, error: true };
    case "UPDATE_AUTH":
      return {
        ...state,
        ...payload,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        username: payload.username,
        favoritePets: payload.favoritepets,
      };
    case "LOGOUT":
      return initialState;
    case "CHANGE_USERNAME":
      return {
        ...state,
        username: payload,
      };
    case "ADD_PET":
      return {
        ...state,
        favoritePets: [...state.favoritePets, payload],
      };
    case "REMOVE_FAV":
      return {
        ...state,
        favoritePets: state.favoritePets.filter((el) => el.id !== payload),
      };
    default:
      return state;
  }
};
