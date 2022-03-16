import { Action, createReducer, on } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { firstPage, lastPage, nextPage, previousPage, searchGiphies, searchGiphiesSuccess, setQueryToSearch } from '../actions/giphy.actions';
import { GiphyState } from '../interfaces/giphy.state';

const initialState: GiphyState = {
  giphies: [],
  currentPage: 0,
  totalCount: 0,
  preserveStoredGiphs: false,
  searchQuery: ''
};

const pageSize = environment.pagesize;

const giphyReducer = createReducer(
  initialState,
  on(nextPage, (state) => ({
    ...state,
    currentPage: state.currentPage + 1
  })),
  on(previousPage, state => ({
    ...state,
    currentPage: state.currentPage > 0 ? state.currentPage - 1 : 0,
    preserveStoredGiphs: true
  })),
  on(firstPage, state => ({
    ...state,
    currentPage: 0,
    preserveStoredGiphs: true
  })),
  on(lastPage, state => ({
    ...state,
    currentPage: Math.round((state.totalCount / pageSize)) - 1
  })),
  on(searchGiphiesSuccess, (state, { giphies, pageNumber, totalCount = 0 }) => {
    // When we reset to the first page or toggle back and fort we cannot merge both arrays, the data will be duplicated.
    // By using a control flag that we can bypass this problem.
    const newGiphies = state.preserveStoredGiphs ? [...state.giphies] : [...state.giphies, ...giphies]
    return {
      ...state,
      giphies: newGiphies,
      currentPage: pageNumber,
      totalCount,
      preserveStoredGiphs: state.preserveStoredGiphs && giphies.length / pageSize > pageNumber + 1
    };
  }),
  on(setQueryToSearch, (state, { query }) => ({
    ...initialState,
    searchQuery: query,
  })),
);

export function reducer(
  state: GiphyState | undefined,
  action: Action
): GiphyState {
  return giphyReducer(state, action);
}
