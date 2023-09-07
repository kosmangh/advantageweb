import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeneralResponse } from '../@restmodels/general.response';
import { User } from '../@models/user';
import { GeneralDeleteRequest } from '../@restmodels/general-delete.request';
import { EstateListResponse } from '../@restmodels/settings/estate-list.response';
import { EstateRequest } from '../@restmodels/settings/estate.request';
import { GeneralSearchRequest } from '../@restmodels/general-search.request';
import { PortalMenus } from '../@models/portalMenus';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class EstateService  {

  constructor(
    private utilsService: UtilsService,
    private http: HttpClient,
    private logger: NGXLogger,
  ) {

  }

  getEstates(currentUser,searchBy: string, searchValue: string): Observable<EstateListResponse> {
    const request = new GeneralSearchRequest();
    request.searchBy = searchBy;
    request.searchValue = searchValue;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'ESTATE_LIST');
    this.logger.info('estate list request ' + JSON.stringify(request));
    return this.http.post<EstateListResponse>(`${environment.url + PortalMenus.API_SETTINGS}estates`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  createEstate(currentUser: User, request: EstateRequest): Observable<GeneralResponse> {
    request.createdBy = currentUser.username;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'CREATE_ESTATE');
    this.logger.info('create zone request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_SETTINGS}createestate`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  updateEstate(currentUser: User, request: EstateRequest): Observable<GeneralResponse> {
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'UPDATE_ESTATE');
    request.lastModifiedBy = currentUser.username;
    this.logger.info('update zone request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_SETTINGS}updateestate`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }
  

  deleteEstate(currentUser: User, recordId: string): Observable<GeneralResponse> {
    const request = new GeneralDeleteRequest();
    request.recordId = recordId;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'DELETE_ESTATE');
    this.logger.info('delete zone request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_SETTINGS}deleteestate`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

}
