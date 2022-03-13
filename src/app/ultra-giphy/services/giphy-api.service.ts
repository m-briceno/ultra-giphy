import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiphyApiService {

  constructor() { }

  public getGiphies(): Observable<any> {
    return of("")
  }
}
