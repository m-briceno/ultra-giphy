import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, tap } from "rxjs";
import { decrementRequestCounter, incrementRequestCounter } from "src/app/ultra-giphy/store/actions/http-request.actions";
import { AppState } from "src/app/ultra-giphy/store/interfaces/app.state";
import { environment } from "src/environments/environment";

@Injectable()
export class HttpCounterInterceptor implements HttpInterceptor {
  private giphyApiKey = environment.apiKey;

  constructor(private store: Store<AppState>){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    this.store.dispatch(incrementRequestCounter());
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if(event instanceof HttpResponse) {
          this.store.dispatch(decrementRequestCounter());
        }
      })
    );
  }
}
