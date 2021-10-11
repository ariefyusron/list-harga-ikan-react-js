import { API } from "../../configs";
import { Dispatch } from "../types";

// get seasons
export const GET_SEASON_PENDING = "GET_SEASON_PENDING";
export const GET_SEASON_SUCCESS = "GET_SEASON_SUCCESS";
export const GET_SEASON_ERROR = "GET_SEASON_ERROR";

export const getSeasons = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_SEASON_PENDING });
    const res = await API.getSeasons();
    dispatch({
      type: GET_SEASON_SUCCESS,
      payload: { data: res.data.api.seasons },
    });
  } catch (err) {
    if (err.response) {
      dispatch({ type: GET_SEASON_ERROR, payload: { data: err.response } });
    } else {
      dispatch({ type: GET_SEASON_ERROR });
    }
  }
};
