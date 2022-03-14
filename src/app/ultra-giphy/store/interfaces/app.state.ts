import { Giph } from '../../models/giph';
import { GiphyState } from './giphy.state';
import { HttpRequestsState } from './http-request.state';

export interface AppState {
  giphy: GiphyState;
  httpRequest: HttpRequestsState;
  counter: number;
}
