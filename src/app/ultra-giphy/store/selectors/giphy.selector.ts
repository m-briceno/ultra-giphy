import { createSelector } from "@ngrx/store";
import { AppState } from "../interfaces/app.state";
import { GiphyState } from "../interfaces/giphy.state";

export const selectGiphyState = (state: AppState) => state.giphy;

export const getGiphies = createSelector(
  selectGiphyState,
  (state: GiphyState) => state.giphies
);

export const getCurrentPage = createSelector(
  selectGiphyState,
  (state: GiphyState) => state.currentPage
);

export const getSearchQuery = createSelector(
  selectGiphyState,
  (state: GiphyState) => state.searchQuery
);
