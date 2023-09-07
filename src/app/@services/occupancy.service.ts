import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Observable, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../@models/user';
import { UtilsService } from './utils.service';
import { OccupantListRequest } from '../@restmodels/occupancy/occupant-list.request';
import { OccupantListResponse } from '../@restmodels/occupancy/occupant-list.response';
import { GeneralResponse } from '../@restmodels/general.response';
import { OccupantRequest } from '../@restmodels/occupancy/occupant.request';
import { GeneralDeleteRequest } from '../@restmodels/general-delete.request';
import { OccupantPropertyListResponse } from '../@restmodels/occupancy/occupant-property-list.response';
import { OccupantPropertyListRequest } from '../@restmodels/occupancy/occupant-property-list.request';
import { OccupantPropertyRequest } from '../@restmodels/occupancy/occupant-property.request';
import { OccupiedPropertyQuickSearchRequest } from '../@restmodels/occupancy/occupied-property-quick-search.request';

@Injectable({
  providedIn: 'root'
})
export class OccupancyService {

  OCCUPANCY: string = "/occupancy/";


  constructor(
    private utilsService: UtilsService,
    private http: HttpClient,
    private logger: NGXLogger,
  ) {

  }

  createOccupant(currentUser: User, request: OccupantRequest): Observable<GeneralResponse> {
    request.createdBy = currentUser.username;
    request.nationality = "GHANAIAN";
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'CREATE_OCCUPANT');
    this.logger.info('create occupant request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + this.OCCUPANCY}createoccupant`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  updateOccupant(currentUser: User, request: OccupantRequest): Observable<GeneralResponse> {
    // request.dateOfBirth = this.utilsService.formatDateToString(request.dateOfBirth);
    request.lastModifiedBy = currentUser.username;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'UPDATE_OCCUPANT');
    this.logger.info('update occupant request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + this.OCCUPANCY}updateoccupant`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  deleteOccupant(currentUser: User, recordId: string): Observable<GeneralResponse> {
    let request = new GeneralDeleteRequest();
    request.recordId = recordId;
    request.deletedBy = currentUser.username;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'DELETE_OCCUPANT');
    this.logger.info('delete occupant request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + this.OCCUPANCY}deleteoccupant`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  searchOccupants(currentUser: User, request: OccupantListRequest): Observable<OccupantListResponse> {
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'OCCUPANTS_LIST');
    this.logger.info('searchOccupants request ' + JSON.stringify(request));
    return this.http.post<OccupantListResponse>(`${environment.url + this.OCCUPANCY}occupants`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }



  searchOccupantProperties(currentUser: User, request: OccupantPropertyListRequest): Observable<OccupantPropertyListResponse> {
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'OCCUPANT_PROPERTIES_LIST');
    this.logger.info('searchOccupantProperties request ' + JSON.stringify(request));
    return this.http.post<OccupantPropertyListResponse>(`${environment.url + this.OCCUPANCY}occupantproperties`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  quickSearchOccupantProperties(currentUser: User, searchText: any, occupationType: string): Observable<any> {
    let request = new OccupiedPropertyQuickSearchRequest();
    request.searchText = searchText;
    request.occupationType = occupationType;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'OCCUPANT_PROPERTIES_LIST');
    // this.logger.info('searchOccupantProperties request ' + JSON.stringify(request));
    return this.http
      .post<OccupantPropertyListResponse>(`${environment.url + this.OCCUPANCY}occupiedpropertiesquicksearch`, request);
  }

  createOccupantProperty(currentUser: User, request: OccupantPropertyRequest): Observable<GeneralResponse> {
    request.createdBy = currentUser.username;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'CREATE_OCCUPANT_PROPERTY');
    this.logger.info('create create occupantProperty request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + this.OCCUPANCY}createoccupantproperty`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  updateOccupantProperty(currentUser: User, request: OccupantPropertyRequest): Observable<GeneralResponse> {
    request.lastModifiedBy = currentUser.username;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'UPDATE_OCCUPANT_PROPERTY');
    this.logger.info(' updateOccupantProperty request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + this.OCCUPANCY}updateoccupantproperty`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  deleteOccupantProperty(currentUser: User, recordId: string): Observable<GeneralResponse> {
    let request = new GeneralDeleteRequest();
    request.recordId = recordId;
    request.deletedBy = currentUser.username;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'DELETE_OCCUPANT_PROPERTY');
    this.logger.info('deleteOccupantProperty request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + this.OCCUPANCY}deleteoccupantproperty`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }


}
