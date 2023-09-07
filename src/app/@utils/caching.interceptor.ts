import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { share } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent } from '@angular/common/http';

export @Injectable()
class CachingInterceptor implements HttpInterceptor {

  private cache: Map<HttpRequest, HttpResponse> = new Map();
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== "GET") {
      return next.handle(req)
    }
    if (req.headers.get("reset")) {
      this.cache.delete(req)
    }
    const cachedResponse: HttpResponse = this.cache.get(req)
    if (cachedResponse) {
      return of(cachedResponse.clone())
    } else {
      return next.handle(req).pipe(
            do (stateEvent => {
        if (stateEvent instanceof HttpResponse) {
          this.cache.set(req, stateEvent.clone())
        }
      })
        ).share()
    }
  }
}
