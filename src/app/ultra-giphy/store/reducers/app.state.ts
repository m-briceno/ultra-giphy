import { Giph } from '../../models/giph';

export interface AppState {
  giphies: Giph[];
  currentPage: number;
}
