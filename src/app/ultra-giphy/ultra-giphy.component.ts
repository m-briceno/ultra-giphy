import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GiphyService } from '../services/giphy.service';
import { Giph } from './models/giph';
import { AppState } from './store/interfaces/app.state';
import { baseStateFromHttp, hasPendingRequests } from './store/selectors/http-requests.selector';

@Component({
  selector: 'app-ultra-giphy',
  templateUrl: './ultra-giphy.component.html',
  styleUrls: ['./ultra-giphy.component.scss']
})
export class UltraGiphyComponent implements OnInit {

  constructor(
    private giphyService: GiphyService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.giphyService.fetchTrendingGiphies().subscribe((giphs: Giph) => console.log("giphs", giphs));

    this.store.select(hasPendingRequests).subscribe(val => console.log("VALUE PENDING REQUESTS!!!", val));
    this.store.select(baseStateFromHttp).subscribe(val => console.log("VALUE 2222 PENDING REQUESTS!!!", val));
  }

}
