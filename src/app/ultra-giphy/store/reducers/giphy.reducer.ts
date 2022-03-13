import { AppState } from './app.state';
import { createReducer, on } from '@ngrx/store';
import { firstPage, lastPage, nextPage, previousPage, searchGiphies, searchSpecificGiphies } from '../actions/giphy.actions';

export const initialState: AppState = {
  giphies: [],
  currentPage: 0
};

export const giphyReducer = createReducer(
  initialState,
  on(nextPage, state => ({ ...state })),
  on(previousPage, state => ({ ...state })),
  on(firstPage, state => ({ ...state })),
  on(lastPage, state => ({ ...state })),
  on(searchGiphies, state => ({ ...state })),
  on(searchSpecificGiphies, (state, { query }) => ({ ...state })),
);
