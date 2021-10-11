import { API } from "../../configs";
import { Dispatch, GetState } from "../types";

export const GET_DATA_PENDING = "GET_DATA_PENDING";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_ERROR = "GET_DATA_ERROR";

export const getData = (search: any, loadMore = false) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    const homeState = getState().home;

    dispatch({
      type: GET_DATA_PENDING,
      payload: { loadMore, isSearch: search && !loadMore ? true : false },
    });

    const response = await API.getData(
      homeState.limit,
      loadMore ? homeState.list.length : 0,
      search
    );
    dispatch({
      type: GET_DATA_SUCCESS,
      payload: { data: response.data, loadMore },
    });
  } catch (err) {
    dispatch({ type: GET_DATA_ERROR, payload: { data: err } });
  }
};
