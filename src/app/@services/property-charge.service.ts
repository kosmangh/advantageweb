import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeneralResponse } from '../@restmodels/general.response';
import { User } from '../@models/user';
import { GeneralDeleteRequest } from '../@restmodels/general-delete.request';
import { PortalMenus } from '../@models/portalMenus';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { UtilsService } from './utils.service';
import { PropertyChargeListResponse } from '../@restmodels/estate-billing/property-charge-list.response';
import { PropertyChargeRequest } from '../@restmodels/estate-billing/property-charge.request';
import { PropertyChargeListRequest } from '../@restmodels/estate-billing/property-charge-list.request';

@Injectable({
  providedIn: 'root'
})
export class PropertyChargeService  {

  constructor(
    private utilsService: UtilsService,
    private http: HttpClient,
    private logger: NGXLogger,
  ) {

  }

  getPropertyCharges(currentUser:User, regionId: string, chargeYear: number): Observable<PropertyChargeListResponse> {
    const request = new PropertyChargeListRequest();
    request.regionId = regionId;
    request.chargeYear = chargeYear;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'PROPERTY_CHARGE_LIST');
    this.logger.info('getPropertyCharges list request ' + JSON.stringify(request));
    return this.http.post<PropertyChargeListResponse>(`${environment.url + PortalMenus.API_ESTATE_BILLING}propertycharges`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  createPropertyCharge(currentUser: User, request: PropertyChargeRequest): Observable<GeneralResponse> {
    request.createdBy = currentUser.username;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'CREATE_PROPERTY_CHARGE');
    this.logger.info('createPropertyCharge request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_ESTATE_BILLING}createpropertycharge`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  updatePropertyCharge(currentUser: User, request: PropertyChargeRequest): Observable<GeneralResponse> {
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'UPDATE_PROPERTY_CHARGE');
    request.lastModifiedBy = currentUser.username;
    this.logger.info('update zone request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_ESTATE_BILLING}updatepropertycharge`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }
  

  deletePropertyCharge(currentUser: User, recordId: string): Observable<GeneralResponse> {
    const request = new GeneralDeleteRequest();
    request.recordId = recordId;
    request.deletedBy=currentUser.username;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'DELETE_PROPERTY_CHARGE');
    this.logger.info('deletePropertyCharge request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_ESTATE_BILLING}deletepropertycharge`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

}
