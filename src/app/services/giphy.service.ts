import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Giph } from '../ultra-giphy/models/giph';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  private giphyUrl = environment.baseUrl;
  private pageSize = 9;
  constructor(private http: HttpClient) { }

  public fetchSearchedGiphy(query: string, offset: number = 0): Observable<any> {
    const params = this.buildHttpParams(offset);
    return of("")
  }

  public fetchTrendingGiphies(offset: number = 0): Observable<Giph> {
    const params = this.buildHttpParams(offset);
    return this.http.get<Giph>(`${this.giphyUrl}/trending`, {params});
  }

  private buildHttpParams(offset: number): HttpParams {
    return new HttpParams()
    .append('limit', this.pageSize)
    .append('offset', offset);
  }
}
