import { API, BodyPostData } from "../../configs";
import { Dispatch, GetState } from "../types";

export const GET_DATA_PENDING = "GET_DATA_PENDING";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_ERROR = "GET_DATA_ERROR";

export const GET_AREA_PENDING = "GET_AREA_PENDING";
export const GET_AREA_SUCCESS = "GET_AREA_SUCCESS";
export const GET_AREA_ERROR = "GET_AREA_ERROR";

export const GET_SIZE_PENDING = "GET_SIZE_PENDING";
export const GET_SIZE_SUCCESS = "GET_SIZE_SUCCESS";
export const GET_SIZE_ERROR = "GET_SIZE_ERROR";

export const POST_DATA_PENDING = "POST_DATA_PENDING";
export const POST_DATA_SUCCESS = "POST_DATA_SUCCESS";
export const POST_DATA_ERROR = "POST_DATA_ERROR";

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

export const getArea = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_AREA_PENDING });

    const response = await API.getArea();
    dispatch({
      type: GET_AREA_SUCCESS,
      payload: { data: response.data },
    });
  } catch (err) {
    dispatch({ type: GET_AREA_ERROR, payload: { data: err } });
  }
};

export const getSize = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_SIZE_PENDING });

    const response = await API.getSize();
    dispatch({
      type: GET_SIZE_SUCCESS,
      payload: { data: response.data },
    });
  } catch (err) {
    dispatch({ type: GET_SIZE_ERROR, payload: { data: err } });
  }
};

export const postData = (body: BodyPostData, cbSuccess: () => void) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: POST_DATA_PENDING });

    const response = await API.postData(body);
    cbSuccess();
    dispatch({
      type: POST_DATA_SUCCESS,
      payload: { data: response.data },
    });
  } catch (err) {
    dispatch({ type: POST_DATA_ERROR, payload: { data: err } });
  }
};
