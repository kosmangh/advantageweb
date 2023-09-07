import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && this.authService.userValue) {
                // auto logout if 401 or 403 response returned from api
                this.authService.logout();
            }

            let error = err.error?.message || ('Error Code : ' + err.status + ' ' + err.statusText);
            if (err.status === 0 || err.status === '0') {
                error = 'Error connecting to server';
            }
            console.error(err);
            return throwError(error);
        }));
    }
}