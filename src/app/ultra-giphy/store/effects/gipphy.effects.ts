import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";
import { map, mergeMap, of, switchMap, withLatestFrom } from "rxjs";
import { GiphyService } from "src/app/services/giphy.service";
import { environment } from "src/environments/environment";
import { Giph } from "../../models/giph";
import { GiphyRequest } from "../../models/requests";
import { firstPage, lastPage, nextPage, previousPage, searchGiphies, searchGiphiesSuccess, setQueryToSearch } from "../actions/giphy.actions";
import { AppState } from "../interfaces/app.state";
import { getCurrentPage, getGiphies, getSearchQuery } from "../selectors/giphy.selector";

@Injectable()
export class GiphyEffects {
  private pageSize = environment.pagesize;

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private giphyService: GiphyService
  ) { }


  //Next and previous Violating DRY.
  nextPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(nextPage),
      withLatestFrom(
        this.store.select(getGiphies),
        this.store.select(getCurrentPage),
      ),
      switchMap(([action, giphies, pageNumber]) => {
        if(this.isPagePresent(pageNumber, giphies)) {
          return [searchGiphiesSuccess(
            {
              giphies: giphies,
              pageNumber,
            })];
        } else {
          return [searchGiphies()];
        }
      })
    )
  );

  searchGiphies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchGiphies),
      withLatestFrom(
        this.store.select(getCurrentPage),
        this.store.select(getSearchQuery)
      ),
      switchMap(([action, pageNumber, query]) => {
        if(query) {
          return this.giphyService.fetchSpecificGiphies(query, pageNumber).pipe(
            map((req:GiphyRequest) => {
              return this.buildSearchGiphySuccess(req, pageNumber);
            })
          );
        } else {
          return this.giphyService.fetchTrendingGiphies(pageNumber).pipe(
            map(req => {
              return this.buildSearchGiphySuccess(req, pageNumber);
            })
          );
        }
      })
    )
  );

  private buildSearchGiphySuccess(req: GiphyRequest, pageNumber: number): TypedAction<string> {
    return searchGiphiesSuccess(
      {
        giphies: req.data,
        pageNumber,
        totalCount: req.pagination.total_count
      })
  }

  private isPagePresent(page: number, data: Giph[]): boolean {
    if(data.length < (page * this.pageSize) + this.pageSize) {
      return false
    }
    return true;
  }
}
