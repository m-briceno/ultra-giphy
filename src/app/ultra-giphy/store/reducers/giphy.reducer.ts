import { Action, createReducer, on } from '@ngrx/store';
import { firstPage, lastPage, nextPage, previousPage, searchGiphies, searchSpecificGiphies } from '../actions/giphy.actions';
import { GiphyState } from '../interfaces/giphy.state';

const initialState: GiphyState = {
  giphies: [],
  currentPage: 0,
};

const giphyReducer = createReducer(
  initialState,
  on(nextPage, state => ({ ...state })),
  on(previousPage, state => ({ ...state })),
  on(firstPage, state => ({ ...state })),
  on(lastPage, state => ({ ...state })),
  on(searchGiphies, state => ({ ...state })),
  on(searchSpecificGiphies, (state, { query }) => ({ ...state })),
);

export function reducer(
  state: GiphyState | undefined,
  action: Action
): GiphyState {
  return giphyReducer(state, action);
}
