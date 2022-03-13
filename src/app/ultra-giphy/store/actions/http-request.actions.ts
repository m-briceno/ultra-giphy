import { createAction } from '@ngrx/store';

/**
 * This is basically an overkill. The sole reason for this is that I don't want a component to know
 * at which page it is. It should only be worried about getting user information regarding which page
 * to go to and leave the handling itself to someone else. The dummy component will only consume & display data.
 */
export const incrementRequestCounter = createAction(
  '[Giphy] Increment the http request counter'
);

export const decrementRequestCounter = createAction(
  '[Giphy] Decrement the http request counter'
);
