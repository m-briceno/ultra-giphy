import { Giph } from '../../models/giph';
import { searchGiphiesSuccess } from '../actions/giphy.actions';
import { AppState } from '../interfaces/app.state';
import { GiphyState } from '../interfaces/giphy.state';
import { giphyInitialState, reducer } from '../reducers/giphy.reducer';

describe('GipphyEffect testing', () => {

  const initialState = giphyInitialState;

  it('should update store with new giphies when preserveStoredGiphs is false', () => {
    // Given
    const giphies: Giph[] = [{id: '4'} as Giph]
    const newState: GiphyState = {
      ...giphyInitialState,
      giphies
    } as GiphyState;
    const action = searchGiphiesSuccess({giphies,pageNumber: 0,totalCount: 0})

    // When
    const state = reducer(initialState, action);

    // Then
    expect(state.giphies).toEqual(newState.giphies);
  });

  it('should persist previous giphies when preserveStoredGiphs is true', () => {
    // Given
    const giphies: Giph[] = [{id: '4'} as Giph]
    const state: GiphyState = {
      ...giphyInitialState,
      giphies,
      preserveStoredGiphs: true
    } as GiphyState;
    const action = searchGiphiesSuccess({giphies,pageNumber: 0,totalCount: 0})

    // When
    const newState = reducer(state, action);

    // Then
    expect(newState.giphies).toEqual(state.giphies);
  });
});
