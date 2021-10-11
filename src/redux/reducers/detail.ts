import {
  GET_SEASON_ERROR,
  GET_SEASON_PENDING,
  GET_SEASON_SUCCESS,
} from "../actions";
import { Action, DetailState } from "../types";

const initialState: DetailState = {
  data: [],
  isLoading: false,
};

export default (state = initialState, { type, payload }: Action) => {
  switch (type) {
    // get season
    case GET_SEASON_PENDING:
      return { ...state, isLoading: true };
    case GET_SEASON_SUCCESS:
      return { ...state, isLoading: false, data: payload.data };
    case GET_SEASON_ERROR:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
