import { Dispatch, GetState } from "../types";

export const SAMPLE_ACTION = "SAMPLE_ACTION";

export const sampleAction = () => (dispatch: Dispatch, getState: GetState) => {
  const { home } = getState();
  dispatch({ type: SAMPLE_ACTION, payload: { data: home.count + 1 } });
};
