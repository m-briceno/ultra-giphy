import { createAction, props } from '@ngrx/store';
import { Giph } from '../../models/giph';

/**
 * This is basically an overkill. The sole reason for this is that I don't want a component to know
 * at which page it is. It should only be worried about getting user information regarding which page
 * to go to and leave the handling itself to someone else. The dummy component will only consume & display data.
 */
export const nextPage = createAction(
  '[Giphy] Move to the next page'
);

export const previousPage = createAction(
  '[Giphy] Move to the previous page'
);

export const firstPage = createAction(
  '[Giphy] Move to the first page'
);

export const lastPage = createAction(
  '[Giphy] Move to the last page'
);

export const searchGiphies = createAction(
  '[Giphy] Search random giphies'
);

export const searchGiphiesSuccess = createAction(
  '[Giphy] Search random giphies successfully',
  props<{ giphies: Giph[], pageNumber: number, totalCount: number }>()
);

export const searchSpecificGiphies = createAction(
  '[Giphy] Search for a user queried giphy',
  props<{ query: string; }>()
);
