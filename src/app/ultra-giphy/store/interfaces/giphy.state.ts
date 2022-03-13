import { createFeatureSelector } from '@ngrx/store';
import { Giph } from '../../models/giph';
import { AppState } from './app.state';

export interface GiphyState {
  giphies: Giph[];
  currentPage: number;
}

export const getGiphyState = createFeatureSelector<AppState, GiphyState>('giphy');
