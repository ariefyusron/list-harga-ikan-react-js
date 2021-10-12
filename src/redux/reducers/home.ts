import {
  GET_DATA_ERROR,
  GET_DATA_PENDING,
  GET_DATA_SUCCESS,
  GET_AREA_PENDING,
  GET_AREA_SUCCESS,
  GET_AREA_ERROR,
  GET_SIZE_ERROR,
  GET_SIZE_PENDING,
  GET_SIZE_SUCCESS,
  POST_DATA_ERROR,
  POST_DATA_PENDING,
  POST_DATA_SUCCESS,
} from "../actions";
import { Action, HomeState } from "../types";

const initialState: HomeState = {
  list: [],
  isLoading: false,
  limit: 20,
  loadMore: true,
  area: {
    isLoading: false,
    list: [],
  },
  size: {
    isLoading: false,
    list: [],
  },
  isLoadingCreate: false,
};

export default (state = initialState, { type, payload }: Action) => {
  switch (type) {
    case GET_DATA_PENDING:
      return {
        ...state,
        isLoading: true,
        loadMore: true,
        list: payload.isSearch ? initialState.list : state.list,
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: payload.loadMore
          ? [...state.list, ...payload.data]
          : payload.data,
        loadMore: payload.data.length === initialState.limit,
      };
    case GET_DATA_ERROR:
      return { ...state, isLoading: false };

    case GET_AREA_PENDING:
      return { ...state, area: { ...state.area, isLoading: true } };
    case GET_AREA_SUCCESS:
      return {
        ...state,
        area: { ...state.area, isLoading: false, list: payload.data },
      };
    case GET_AREA_ERROR:
      return { ...state, area: { ...state.area, isLoading: false } };

    case GET_SIZE_PENDING:
      return { ...state, size: { ...state.size, isLoading: true } };
    case GET_SIZE_SUCCESS:
      return {
        ...state,
        size: { ...state.size, isLoading: false, list: payload.data },
      };
    case GET_SIZE_ERROR:
      return { ...state, size: { ...state.size, isLoading: false } };

    case POST_DATA_PENDING:
      return { ...state, isLoadingCreate: true };
    case POST_DATA_SUCCESS:
      return { ...state, isLoadingCreate: false };
    case POST_DATA_ERROR:
      return { ...state, isLoadingCreate: false };

    default:
      return state;
  }
};
