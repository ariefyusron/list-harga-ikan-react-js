import { API } from "../../configs";
import { Dispatch } from "../types";

export const GET_DATA_PENDING = "GET_DATA_PENDING";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_ERROR = "GET_DATA_ERROR";

export const getData = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_DATA_PENDING });

    const response = await API.getData();
    dispatch({ type: GET_DATA_SUCCESS, payload: { data: response.data } });
  } catch (err) {
    dispatch({ type: GET_DATA_ERROR, payload: { data: err } });
  }
};
