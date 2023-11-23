import { PortalMenus } from 'src/app/@models/portalMenus';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Observable, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../@models/user';
import { UtilsService } from './utils.service';
import { GeneralResponse } from '../@restmodels/general.response';
import { GeneralDeleteRequest } from '../@restmodels/general-delete.request';
import { StaffRequest } from '../@restmodels/user-accounts/staff.request';
import { GeneralSearchRequest } from '../@restmodels/general-search.request';
import { StaffListResponse } from '../@restmodels/user-accounts/staff-list.response';
import { LoginAccountRequest } from '../@restmodels/user-accounts/login-account.request';

@Injectable({
  providedIn: 'root'
})
export class StaffService {


  constructor(
    private utilsService: UtilsService,
    private http: HttpClient,
    private logger: NGXLogger,
  ) {

  }

  createStaff(currentUser: User, request: StaffRequest): Observable<GeneralResponse> {
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'SAVE_STAFF');
    request.createdBy = currentUser.username;
    request.dob = request.dob;
    request.lastModifiedBy = "NEW_STAFF";
    this.logger.info('create staff request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_USER_ACCOUNTS }createstaff`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  updateStaff(currentUser: User, request: StaffRequest): Observable<GeneralResponse> {
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'UPDATE_STAFF');
    request.lastModifiedBy = currentUser.username;
    this.logger.info('update staff request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_USER_ACCOUNTS }updatestaff`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  deleteStaff(currentUser: User, recordId: string): Observable<GeneralResponse> {
    let request = new GeneralDeleteRequest();
    request.recordId = recordId;
    request.deletedBy = currentUser.username;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'DELETE_STAFF');
    this.logger.info('delete staff request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_USER_ACCOUNTS }deletestaff`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  searchStaffs(currentUser: User, searchBy: string, searchValue: string): Observable<StaffListResponse> {
    const request = new GeneralSearchRequest();
    request.searchBy = searchBy;
    request.searchValue = searchValue;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'STAFFS_LIST');
    this.logger.info('searchStaffs request ' + JSON.stringify(request));
    return this.http.post<StaffListResponse>(`${environment.url + PortalMenus.API_USER_ACCOUNTS }staffs`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  createLoginAccount(currentUser: User, request: LoginAccountRequest): Observable<GeneralResponse> {

    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'CREATE_ACCOUNT');
    request.createdBy = currentUser.username;
    this.logger.info('create staff request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_USER_ACCOUNTS}createaccount`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  resetPassword(currentUser: User, request: LoginAccountRequest): Observable<GeneralResponse> {

    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'RESET_PASSWORD');
    request.createdBy = currentUser.username;
    this.logger.info('reset staff password request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_USER_ACCOUNTS}adminresetpassword`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }



 

 


}
