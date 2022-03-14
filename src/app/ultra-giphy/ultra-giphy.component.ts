import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { GiphyService } from '../services/giphy.service';
import { Giph } from './models/giph';
import { searchGiphies } from './store/actions/giphy.actions';
import { AppState } from './store/interfaces/app.state';
import { getGiphies } from './store/selectors/giphy.selector';
import { hasPendingRequests } from './store/selectors/http-requests.selector';

@Component({
  selector: 'app-ultra-giphy',
  templateUrl: './ultra-giphy.component.html',
  styleUrls: ['./ultra-giphy.component.scss']
})
export class UltraGiphyComponent implements OnInit, OnDestroy {

  private subscriptions$: Subscription = new Subscription();
  httpRequestCounter$: Observable<any>;
  giphies: Giph[] = [];

  constructor(
    private giphyService: GiphyService,
    private store: Store<AppState>
  ) {
    this.httpRequestCounter$ = this.store.select(hasPendingRequests).pipe(map(req => req && req.pendingRequests > 0));
   }

  ngOnInit(): void {
    this.store.dispatch(searchGiphies());

    this.subscriptions$.add(
      this.store.select(getGiphies)
      .subscribe(giphies => {
        this.giphies = giphies;
      })
    );
  }

  ngOnDestroy(): void {
      this.subscriptions$.unsubscribe();
  }

}
