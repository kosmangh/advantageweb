import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NGXLogger } from 'ngx-logger';
import { AuthService } from '../@services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private accountService: AuthService,
        private logger: NGXLogger
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([ 401, 403 ].includes(err.status) && this.accountService.userValue) {
                // auto logout if 401 or 403 response returned from api
                this.accountService.logout();
            }
            let error = err.error?.message || ('Error Code : ' + err.status + ' - ' + err.statusText);
            if (err.status === 0 || err.status === '0') {
                error = 'Error connecting to server';
            }
            this.logger.error(err);
            return throwError(error);
        }));
    }
}