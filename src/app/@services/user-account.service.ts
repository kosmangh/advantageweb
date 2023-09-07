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
import { DepartmentRequest } from '../@restmodels/user-accounts/department.request';
import { GeneralRequest } from '../@restmodels/general.request';
import { DepartmentListResponse } from '../@restmodels/user-accounts/department-list.response';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  USER_ACCOUNTS: string = "/useraccounts/";


  constructor(
    private utilsService: UtilsService,
    private http: HttpClient,
    private logger: NGXLogger,
  ) {

  }


  createDepartment(currentUser: User, request: DepartmentRequest): Observable<GeneralResponse> {
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'SAVE_DEPARTMENT');
    request.createdBy = currentUser.username;
    this.logger.info('create department request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + this.USER_ACCOUNTS}createdepartment`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  updateDepartment(currentUser: User, request: DepartmentRequest): Observable<GeneralResponse> {
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'UPDATE_DEPARTMENT');
    request.lastModifiedBy = currentUser.username;
    this.logger.info('update department request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + this.USER_ACCOUNTS}updatedepartment`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  deleteDepartment(currentUser: User, recordId: string): Observable<GeneralResponse> {
    let request = new GeneralDeleteRequest();
    request.recordId = recordId;
    request.deletedBy = currentUser.username;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'DELETE_DEPARTMENT');
    this.logger.info('delete department request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + this.USER_ACCOUNTS}deletedepartment`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  getDepartments(): Observable<DepartmentListResponse> {
    const request = new GeneralRequest();
    request.headerRequest = this.utilsService.getRequestHeader("currentUser.zoneId","currentUser.regionId", 'DEPARTMENT_LIST');
    this.logger.info('zone list request ' + JSON.stringify(request));
    return this.http.post<DepartmentListResponse>(`${environment.url + this.USER_ACCOUNTS}departments`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  createStaff(currentUser: User, request: StaffRequest): Observable<GeneralResponse> {
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'SAVE_STAFF');
    request.createdBy = currentUser.username;
    request.dob = request.dob;
    request.lastModifiedBy="NEW_STAFF";
    this.logger.info('create staff request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + this.USER_ACCOUNTS}createstaff`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  updateStaff(currentUser: User, request: StaffRequest): Observable<GeneralResponse> {
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'UPDATE_STAFF');
    request.lastModifiedBy = currentUser.username;
    this.logger.info('update staff request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + this.USER_ACCOUNTS}updatestaff`, request)
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
    return this.http.post<GeneralResponse>(`${environment.url + this.USER_ACCOUNTS}deletestaff`, request)
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
    return this.http.post<StaffListResponse>(`${environment.url + this.USER_ACCOUNTS}staffs`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }


  
 

  // createaccount

}
