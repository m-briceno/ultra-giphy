import { Action, createReducer, on } from '@ngrx/store';
import { decrementRequestCounter, incrementRequestCounter } from '../actions/http-request.actions';
import { HttpRequestsState } from '../interfaces/http-request.state';

const initialState: HttpRequestsState = {
  pendingRequests: 0
};

const httpRequestsReducer = createReducer(
  initialState,
  on(incrementRequestCounter, state => {
    const pendingRequests = state.pendingRequests + 1;
    return {...state, pendingRequests}
  }),
  on(decrementRequestCounter, state => ({
    ...state,
    pendingRequests: state.pendingRequests === 0 ? 0 : state.pendingRequests - 1
  })),
);

export function reducer(
  state: HttpRequestsState | undefined,
  action: Action
): HttpRequestsState {
  return httpRequestsReducer(state, action);
}
