import { Giph } from "./giph";

export interface GiphyRequest {
  data: Giph[];
  pagination: Pagination;
}

export interface Pagination {
  count: number;
  offset: number;
  total_count: number;
}
