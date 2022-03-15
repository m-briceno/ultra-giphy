import { Action, createReducer, on } from '@ngrx/store';
import { firstPage, lastPage, nextPage, previousPage, searchGiphies, searchGiphiesSuccess, searchSpecificGiphies } from '../actions/giphy.actions';
import { GiphyState } from '../interfaces/giphy.state';

const initialState: GiphyState = {
  giphies: [],
  currentPage: 0,
  totalCount: 0
};

const giphyReducer = createReducer(
  initialState,
  on(nextPage, (state) => ({
    ...state,
    currentPage: state.currentPage + 1
  })),
  on(previousPage, state => ({ ...state })),
  on(firstPage, state => ({ ...state })),
  on(lastPage, state => ({ ...state })),
  on(searchGiphiesSuccess, (state, {giphies,pageNumber, totalCount = 0}) => {
    return {
      ...state,
      giphies: [...state.giphies, ...giphies],
      currentPage: pageNumber,
      totalCount
    };
  }),
  on(searchSpecificGiphies, (state, { query }) => ({ ...state })),
);

export function reducer(
  state: GiphyState | undefined,
  action: Action
): GiphyState {
  return giphyReducer(state, action);
}
