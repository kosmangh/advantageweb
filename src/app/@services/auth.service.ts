import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, throwError, timeout } from 'rxjs';
import { User } from '../@models/user';
import { UtilsService } from './utils.service';
import { NGXLogger } from 'ngx-logger';
import { LoginRequest } from '../@restmodels/auth/login.request';
import { LoginResponse } from '../@restmodels/auth/login.response';
import { PortalMenus } from '../@models/portalMenus';
import { AuditLog } from '../@models/auditLog';
import { GeneralResponse } from '../@restmodels/general.response';
import { AuditLogRequest } from '../@restmodels/auth/audit-log.request';
import { environment } from 'src/environments/environment';
import { AuditLogListRequest } from '../@restmodels/auth/audit-log-list.request';
import { AuditLogListResponse } from '../@restmodels/auth/audit-log-list.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public APP_SESSION_NAME = "advantage";

  constructor(
    private router: Router,
    private utilsService: UtilsService,
    private http: HttpClient,) {

    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(this.APP_SESSION_NAME)!));
    this.currentUser = this.userSubject.asObservable();

  }

  public get userValue(): User {
    let userDetails = new User();
    userDetails = JSON.parse(localStorage.getItem(this.APP_SESSION_NAME)!);
    return userDetails;
  }

  loginUser(username: string, password: string): Observable<any> {
    localStorage.removeItem(this.APP_SESSION_NAME);
    this.userSubject.next(null!);

    const loginRequest = new LoginRequest();
    loginRequest.username = username;
    loginRequest.password = password;
    loginRequest.headerRequest = this.utilsService.getRequestHeader('ALL',"ALL", 'LOGIN_USER');
    loginRequest.headerRequest.sourceCode = "portal";
    loginRequest.headerRequest.sourceChannelId = "portal";
    console.info('login request ' + JSON.stringify(loginRequest));
    return this.http.post<LoginResponse>(`${environment.url + PortalMenus.API_AUTH}login`, loginRequest)
      .pipe(
        timeout(environment.timeout), // Timeout after 10s of no response
        map(response => {
          let usr = new User();
          usr = this.utilsService.getUserInfo(response);
          localStorage.setItem(this.APP_SESSION_NAME, JSON.stringify(usr));
          this.userSubject.next(usr);
          return response;
        }));
  }

  resetPassword(currentUser: User, password: string): Observable<GeneralResponse> {
    localStorage.removeItem(this.APP_SESSION_NAME);
    this.userSubject.next(null!);

    const loginRequest = new LoginRequest();
    loginRequest.username = currentUser.username;
    loginRequest.password = password;
    loginRequest.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'RESET_PASSWORD');
    loginRequest.headerRequest.sourceCode = "WEB";
    loginRequest.headerRequest.sourceChannelId = "portal";
    console.info('login request ' + JSON.stringify(loginRequest));
    return this.http.post<LoginResponse>(`${environment.url + PortalMenus.API_AUTH}passwordreset`, loginRequest)
      .pipe(
        timeout(environment.timeout), // Timeout after 10s of no response
       );
  }

  searchAuditLogs(currentUser: User, searchBy: string, searchValue: string, startDate: Date, endDate: Date): Observable<AuditLogListResponse> {
    const request = new AuditLogListRequest();
    request.searchBy = searchBy;
    request.searchValue = searchValue;
    request.startDate = startDate;
    request.endDate = endDate;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'AUDIT_LOGS');
    return this.http.post<AuditLogListResponse>(`${environment.url + PortalMenus.API_AUTH}auditlogs`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }


  

  logout(): void {
    // remove user from local storage and set current user to null
    this.logAction('Logged out', PortalMenus.LOGOUT);
    this.userSubject.next(null!);
    localStorage.removeItem(this.APP_SESSION_NAME);
    this.router.navigate([ '/login' ]);
  }


  pageNotFound(): void {
    // remove user from local storage and set current user to null
    this.userSubject.next(null!);
    localStorage.removeItem(this.APP_SESSION_NAME);
    // this.router.navigate([ '/login' ]);
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned ${err.status}, error message is: ${err.message}`;
    }
    // console.error(errorMessage);
    return throwError(errorMessage);
  }

  async logAction(msg: string, ui: string): Promise<void> {
    await this.logUserAudit(msg, ui);
  }

  async logUserAudit(logMsg: string, ui: string): Promise<any> {
    try {
      const request = new AuditLogRequest();
      request.headerRequest = this.utilsService.getRequestHeader(this.userValue.zoneId,this.userValue.regionId, 'AUDIT_LOG');
      request.headerRequest.sourceCode = this.userValue.company;
      request.headerRequest.sourceChannelId = this.userValue.company;
      request.username = this.userValue.username;
      request.fullName = this.userValue.fullName;
      request.userRole = this.userValue.userRoleName;
      request.ui = ui;
      request.userActivity = logMsg;
      console.info('logUserAudit request ' + JSON.stringify(request));
      let res = await this.http
        .post(`${environment.url + PortalMenus.API_AUTH}logaudit`, request)
        .toPromise();
      return res as GeneralResponse;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        await this.handleError(error);
      } else {
        // Handle the case when `error` is not of type `HttpErrorResponse`
        // For example, you can log an error message or perform a different action.
        console.debug('general error: ' + JSON.stringify(error));
      }
    }
  }


  async reloadCurrentRoute() {
    let currentUrl = this.router.url;
    setTimeout(() =>
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([ currentUrl ]);
      })
      , 1500);
  }


}
