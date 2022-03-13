import { createFeatureSelector } from "@ngrx/store";
import { AppState } from "./app.state";

export interface HttpRequestsState {
  pendingRequests: number;
}
