import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthService } from '../@services/auth.service';

@Injectable()
export class APIKeyInterceptor implements HttpInterceptor {
    constructor(private accountService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.accountService.userValue;
        const isLoggedIn = user && user.token;
        const isApiUrl = request.url.startsWith(environment.url);

        const key = "pMP1PsVYHB3FQK0Zr1ORg89tN4b5bA4K9hGFfKZa";
        const token = environment.token;

        
        if (user) {

            request = request.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + environment.token,
                    'x-api-key': environment.api_key,
                })
            });
        }
        return next.handle(request);
    }
}
