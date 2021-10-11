import { GET_DATA_ERROR, GET_DATA_PENDING, GET_DATA_SUCCESS } from "../actions";
import { Action, HomeState } from "../types";

const initialState: HomeState = {
  list: [],
  isLoading: false,
};

export default (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case GET_DATA_PENDING:
      return { ...state, isLoading: true };
    case GET_DATA_SUCCESS:
      return { ...state, isLoading: false, list: payload.data };
    case GET_DATA_ERROR:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
