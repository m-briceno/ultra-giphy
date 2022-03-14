import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, mergeMap, of, switchMap, withLatestFrom } from "rxjs";
import { GiphyService } from "src/app/services/giphy.service";
import { firstPage, lastPage, nextPage, previousPage, searchGiphies, searchGiphiesSuccess, searchSpecificGiphies } from "../actions/giphy.actions";
import { AppState } from "../interfaces/app.state";
import { getCurrentPage, getGiphies } from "../selectors/giphy.selector";

@Injectable()
export class GiphyEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private giphyService: GiphyService
  ) { }


  //Probabily many things here will be unnecessary.
  nextPage$ = createEffect(() =>
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
      withLatestFrom(
        this.store.select(getGiphies),
        this.store.select(getCurrentPage)
      ),
      switchMap(([action, giphies, pageNumber]) => {
        return this.giphyService.fetchTrendingGiphies().pipe(
          map(req => {
            return searchGiphiesSuccess(
              {
                giphies: req.data,
                pageNumber: giphies.length === 0 ? 0 : ++pageNumber,
                totalCount: req.pagination.total_count
              });
          })
        );
      })
    )
  );

  searchSpecificGiphies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchSpecificGiphies),
      withLatestFrom(this.store.select(getGiphies)),
      switchMap(([action, giphies]) => {
        return [lastPage()];
      })
    )
  );
}
