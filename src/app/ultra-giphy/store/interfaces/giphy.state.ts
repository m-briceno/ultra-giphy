import { Giph } from '../../models/giph';

export interface GiphyState {
  giphies: Giph[];
  currentPage: number;
  totalCount: number;
  preserveStoredGiphs: boolean;
  searchQuery: string;
}
