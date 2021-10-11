// actions
interface Payload {
  data?: any;
  loadMore?: Boolean;
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
  isLoading: Boolean;
  limit: Number;
  loadMore: Boolean;
}
