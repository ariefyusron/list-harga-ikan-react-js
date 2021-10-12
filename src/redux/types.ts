// actions
interface Payload {
  data?: any;
  loadMore?: boolean;
  isSearch?: boolean;
}

interface Params {
  type: string;
  payload?: Payload;
}

export type Dispatch = (params: Params | Function) => void;
export type GetState = () => Reducers;

export interface Action {
  type: string;
  payload: Payload;
}

// combine reducers
export interface Reducers {
  home: HomeState;
}

// reducers
export interface HomeState {
  list: any[];
  isLoading: boolean;
  limit: number;
  loadMore: boolean;
  area: {
    isLoading: boolean;
    list: any[];
  };
  size: {
    isLoading: boolean;
    list: any[];
  };
  isLoadingCreate: boolean;
}
