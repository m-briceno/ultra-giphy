import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { AppState } from '../interfaces/app.state';
import { GiphyEffects } from './gipphy.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GiphyService } from 'src/app/services/giphy.service';
import { nextPage, searchGiphies, searchGiphiesSuccess } from '../actions/giphy.actions';
import { giphyInitialState } from '../reducers/giphy.reducer';
import { Giph } from '../../models/giph';
import { GiphyRequest } from '../../models/requests';

describe('GipphyEffect testing', () => {
  let actions$: Observable<Action>;
  let service: GiphyService;
  let effects: GiphyEffects;
  let mockStore: MockStore<AppState>;

  const initialState = {
    counter: 0,
    giphy: giphyInitialState,
    httpRequest: {}
  } as AppState

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GiphyEffects,
        provideMockActions(() => actions$),
        provideMockStore({initialState}),
        GiphyService
      ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    effects = TestBed.inject(GiphyEffects);
    service = TestBed.inject(GiphyService);
    mockStore = TestBed.inject(MockStore);
  });

  it('should call searchGiphies when no data is present on the store', () => {
    // Given
    actions$ = of(nextPage());

    // Then
    effects.nextPage$.subscribe(action => {
      expect(action).toEqual(searchGiphies());
    });
  });

  it('should call searchGiphiesSuccess when the current page is already cached', () => {
    // Given
    actions$ = of(nextPage());

    // Then
    const giphies: Giph[] = generateGiphies(9);
    const pageNumber = 0;
    mockStore.setState({
      ...initialState,
      giphy: {
        currentPage: pageNumber,
        giphies: giphies
      }
    } as AppState)

    // Then
    effects.nextPage$.subscribe(action => {
      expect(action).toEqual(searchGiphiesSuccess({giphies, pageNumber}));
    });
  });

  it('should call searchGiphies when the user tries to go to the next page and it is not cached', () => {
    // Given
    actions$ = of(nextPage());

    // Then
    const giphies: Giph[] = generateGiphies(9);
    const pageNumber = 1;
    mockStore.setState({
      ...initialState,
      giphy: {
        currentPage: pageNumber,
        giphies: giphies
      }
    } as AppState)

    // Then
    effects.nextPage$.subscribe(action => {
      expect(action).toEqual(searchGiphies());
    });
  });

  it('should call fetchTrendingGiphies with current page and return buildSearchGiphySuccess when no search query is present', () => {
    // Given
    actions$ = of(searchGiphies());
    const pageNumber = 0;
    const giphies: Giph[] = [];
    const giphyRequest: GiphyRequest = {
      data: [],
      pagination: {
        count: 0,
        offset: 0,
        total_count: 0
      }
    };
    const outcome = searchGiphiesSuccess({giphies, pageNumber, totalCount: giphyRequest.pagination.total_count});
    spyOn(service, 'fetchTrendingGiphies').and.returnValue(of(giphyRequest));

    // Then
    mockStore.setState({
      ...initialState,
      giphy: {
        currentPage: pageNumber,
        searchQuery: ''
      }
    } as AppState)

    // Then
    effects.searchGiphies$.subscribe(action => {
      expect(service.fetchTrendingGiphies).toHaveBeenCalledWith(pageNumber);
      expect(action).toEqual(outcome);
    });
  });

  it('should call fetchSpecificGiphies with current page and userQuery and return buildSearchGiphySuccess', () => {
    // Given
    actions$ = of(searchGiphies());
    const pageNumber = 0;
    const giphies: Giph[] = [];
    const giphyRequest: GiphyRequest = {
      data: [],
      pagination: {
        count: 0,
        offset: 0,
        total_count: 0
      }
    };
    const query = "hello world!";
    const outcome = searchGiphiesSuccess({giphies, pageNumber, totalCount: giphyRequest.pagination.total_count});
    spyOn(service, 'fetchSpecificGiphies').and.returnValue(of(giphyRequest));

    // Then
    mockStore.setState({
      ...initialState,
      giphy: {
        currentPage: pageNumber,
        searchQuery: query
      }
    } as AppState);

    // Then
    effects.searchGiphies$.subscribe(action => {
      expect(service.fetchSpecificGiphies).toHaveBeenCalledWith(query, pageNumber);
      expect(action).toEqual(outcome);
    });
  });
});

function generateGiphies(numberOfGiphies: number): Giph[]{
  const giphs: Giph[] = [];
  for(let i = 0; i < numberOfGiphies; ++i) {
    giphs.push({} as Giph);
  }
  return giphs;
}
