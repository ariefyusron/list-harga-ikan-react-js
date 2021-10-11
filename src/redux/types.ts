// actions
interface Payload {
  data?: any;
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
  detail: DetailState;
}

// reducers
export interface HomeState {
  count: number;
}

export interface DetailState {
  data: [];
  isLoading: boolean;
}
