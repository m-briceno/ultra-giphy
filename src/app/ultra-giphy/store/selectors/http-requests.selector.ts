import { createSelector } from "@ngrx/store";
import { AppState } from "../interfaces/app.state";
import { HttpRequestsState } from "../interfaces/http-request.state";

export const selectHttpRequestsState = (state: AppState) => state.httpRequest;

export const hasPendingRequests = createSelector(
  selectHttpRequestsState,
  (state: HttpRequestsState) => state
);
