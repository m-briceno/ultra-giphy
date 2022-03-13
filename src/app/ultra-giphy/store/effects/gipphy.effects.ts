import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { mergeMap, withLatestFrom } from "rxjs";
import { GiphyService } from "src/app/services/giphy.service";
import { firstPage, lastPage, nextPage, previousPage, searchGiphies, searchSpecificGiphies } from "../actions/giphy.actions";
import { AppState } from "../interfaces/app.state";
import { getGiphies } from "../selectors/giphy.selector";

@Injectable()
export class GiphyEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private giphyService: GiphyService
  ) { }


  //Probabily many things here will be unnecessary.
  /* nextPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(nextPage),
      withLatestFrom(this.store.select(getGiphies)),
      mergeMap(([action, giphies]) => {
        return [lastPage()];
      })
    )
  );

  previousPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(previousPage),
      withLatestFrom(this.store.select(getGiphies)),
      mergeMap(([action, giphies]) => {
        return [lastPage()];
      })
    )
  );

  firstPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(firstPage),
      withLatestFrom(this.store.select(getGiphies)),
      mergeMap(([action, giphies]) => {
        return [lastPage()];
      })
    )
  );

  lastPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(lastPage),
      withLatestFrom(this.store.select(getGiphies)),
      mergeMap(([action, giphies]) => {
        return [lastPage()];
      })
    )
  );

  searchGiphies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchGiphies),
      withLatestFrom(this.store.select(getGiphies)),
      mergeMap(([action, giphies]) => {
        return [lastPage()];
      })
    )
  );

  searchSpecificGiphies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchSpecificGiphies),
      withLatestFrom(this.store.select(getGiphies)),
      mergeMap(([action, giphies]) => {
        return [lastPage()];
      })
    )
  ); */
}
