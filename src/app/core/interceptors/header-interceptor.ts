import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class GiphyHeaderInterceptor implements HttpInterceptor {
  private giphyApiKey = environment.apiKey;

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      const newRequest = req.clone({
        params: (req.params ? req.params : new HttpParams()).set('api_key', this.giphyApiKey)
      });
    return next.handle(newRequest);
  }
}
