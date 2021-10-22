import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

import { AppState } from '../store';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(state => state.auth.accessToken).pipe(first(), switchMap(accessToken => {
      const apiReq = accessToken ? request.clone({
        setHeaders: { Authorization: 'Bearer ' + accessToken }
      }) : request;
      return next.handle(apiReq);
    }));
  }
}
