import { SAMPLE_ACTION } from "../actions";
import { Action, HomeState } from "../types";

const initialState: HomeState = {
  count: 5,
};

export default (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case SAMPLE_ACTION:
      return { ...state, count: payload.data };
    default:
      return state;
  }
};
