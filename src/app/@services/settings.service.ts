import { ZoneRequest } from './../@restmodels/settings/zone.request';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeneralRequest } from '../@restmodels/general.request';
import { RegionListResponse } from '../@restmodels/settings/region-list.response';
import { UtilsService } from './utils.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { GeneralResponse } from '../@restmodels/general.response';
import { User } from '../@models/user';
import { ZoneListResponse } from '../@restmodels/settings/zone-list.response';
import { RegionRequest } from '../@restmodels/settings/region.request';
import { GeneralDeleteRequest } from '../@restmodels/general-delete.request';
import { EstateListResponse } from '../@restmodels/settings/estate-list.response';
import { EstateBlockListResponse } from '../@restmodels/settings/estate-block-list.response';
import { EstateBlockRequest } from '../@restmodels/settings/estate-block.request';
import { EstatePropertyListResponse } from '../@restmodels/settings/estate-property-list.response';
import { EstatePropertyRequest } from '../@restmodels/settings/estate-property.request';
import { EstateRequest } from '../@restmodels/settings/estate.request';
import { GeneralSearchRequest } from '../@restmodels/general-search.request';
import { PortalMenus } from '../@models/portalMenus';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  SETTINGS: string = "/settings/";


  constructor(
    private utilsService: UtilsService,
    private http: HttpClient,
    private logger: NGXLogger,
  ) {

  }



  createData(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${environment.mock_url}/data`, data).pipe(
      timeout(environment.timeout),
    );
  }

  saveZone(currentUser: User, request: ZoneRequest): Observable<GeneralResponse> {
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'CREATE_ZONE');
    request.createdBy = currentUser.username;
    this.logger.info('save zone request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_SETTINGS}savezone`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  updateZone(currentUser: User, request: ZoneRequest): Observable<GeneralResponse> {
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'UPDATE_ZONE');
    request.lastModifiedBy = currentUser.username;
    this.logger.info('update zone request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_SETTINGS}updatezone`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }
  ;

  deleteZone(currentUser: User, recordId: string): Observable<GeneralResponse> {
    const request = new GeneralDeleteRequest();
    request.recordId = recordId;
    request.deletedBy = currentUser.username;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'DELETE_ZONE');
    this.logger.info('delete zone request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_SETTINGS}deletezone`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  getZones(): Observable<ZoneListResponse> {
    const request = new GeneralRequest();
    request.headerRequest = this.utilsService.getRequestHeader("", "", 'ZONE_LIST');
    this.logger.info('zone list request ' + JSON.stringify(request));
    return this.http.post<ZoneListResponse>(`${environment.url + PortalMenus.API_SETTINGS}zones`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  getRegions(): Observable<RegionListResponse> {
    const request = new GeneralRequest();
    request.headerRequest = this.utilsService.getRequestHeader('ALL', "ALL", 'REGION_LIST');
    this.logger.info('regions request ' + JSON.stringify(request));
    return this.http.post<RegionListResponse>(`${environment.url + PortalMenus.API_SETTINGS}regions`, request, {
    })
      .pipe(
        timeout(environment.timeout),
      );
  }

  createRegion(currentUser: User, request: RegionRequest): Observable<GeneralResponse> {
    // const request = new RegionRequest();
    request.createdBy = currentUser.username;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'CREATE_REGION');
    this.logger.info('save zone request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_SETTINGS}createregion`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  updateRegion(currentUser: User, request: RegionRequest): Observable<GeneralResponse> {
    // const request = new GeneralRequest();
    request.lastModifiedBy = currentUser.username;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'UPDATE_REGION');
    this.logger.info('update zone request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_SETTINGS}updateregion`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  deleteRegion(currentUser: User, recordId: string): Observable<GeneralResponse> {
    const request = new GeneralDeleteRequest();
    request.recordId = recordId;
    request.deletedBy = currentUser.username;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'DELETE_REGION');
    this.logger.info('update zone request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_SETTINGS}updateregion`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }



  getEstates(): Observable<EstateListResponse> {
    const request = new GeneralSearchRequest();
    request.searchBy = "ALL";
    request.searchValue = "";
    request.headerRequest = this.utilsService.getRequestHeader("currentUser.zoneId,", "currentUser.regionId", 'STAFFS_LIST');
    this.logger.info('estate list request ' + JSON.stringify(request));
    return this.http.post<EstateListResponse>(`${environment.url + PortalMenus.API_SETTINGS}estates`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  createEstate(currentUser: User, request: EstateRequest): Observable<GeneralResponse> {

    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'CREATE_ESTATE');
    this.logger.info('create zone request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.mock_url + PortalMenus.API_SETTINGS}createestate`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  updateEstate(currentUser: User, request: EstateRequest): Observable<GeneralResponse> {
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'UPDATE_ESTATE');
    this.logger.info('update zone request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.mock_url + PortalMenus.API_SETTINGS}updateestate`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }
  ;

  deleteEstate(currentUser: User, recordId: string): Observable<GeneralResponse> {
    const request = new GeneralDeleteRequest();
    request.recordId = recordId;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'DELETE_ESTATE');
    this.logger.info('delete zone request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.mock_url + PortalMenus.API_SETTINGS}deleteestate`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }


  getEstateBlocks(currentUser: User, estate: string): Observable<EstateBlockListResponse> {
    const request = new GeneralSearchRequest();
    request.searchBy = "estate.recordId";
    request.searchValue = estate;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'ESTATE_BLOCK_LIST');
    this.logger.info('estate block list request ' + JSON.stringify(request));
    return this.http.post<EstateBlockListResponse>(`${environment.url + PortalMenus.API_SETTINGS}estateblocks`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }




  createEstateBlock(currentUser: User, request: EstateBlockRequest): Observable<GeneralResponse> {
    request.createdBy = currentUser.username;
    request.recordId = request.estateId + "/" + request.block;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'CREATE_ESTATE_BLOCK');
    this.logger.info('create estate block request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_SETTINGS}createblock`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  updateEstateBlock(currentUser: User, request: EstateBlockRequest): Observable<GeneralResponse> {
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'UPDATE_ESTATE_BLOCK');
    request.lastModifiedBy = currentUser.username;
    this.logger.info('update estate block request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_SETTINGS}updateblock`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }


  deleteEstateBlock(currentUser: User, recordId: string): Observable<GeneralResponse> {
    const request = new GeneralDeleteRequest();
    request.recordId = recordId;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'DELETE_ESTATE_BLOCK');
    this.logger.info('delete estate block request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_SETTINGS}deleteblock`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  getEstateProperties(currentUser: User, block: string, activeRecords: boolean, occupationType: string): Observable<EstatePropertyListResponse> {
    const request = new GeneralSearchRequest();
    request.searchBy = "estateBlock.recordId";
    request.searchValue = block;
    request.occupiedProps = activeRecords;
    request.occupationType = occupationType
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'ESTATE_PROPERTY_LIST');
    this.logger.info('estate properties list request ' + JSON.stringify(request));
    return this.http.post<EstatePropertyListResponse>(`${environment.url + PortalMenus.API_SETTINGS}estateproperties`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  getProperties(currentUser: User, searchBy: string, searchValue: string): Observable<EstatePropertyListResponse> {
    const request = new GeneralSearchRequest();
    if (searchBy === "PNAM") {
      request.searchBy = "propertyName";
    } else if (searchBy === "PNUM") {
      request.searchBy = "propertyNumber";
    } else if (searchBy === "BAB") {
      request.searchBy = "estateBlock.recordId";
    }
    request.searchValue = searchValue;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'ESTATE_PROPERTY_LIST');
    this.logger.info('estate properties list request ' + JSON.stringify(request));
    return this.http.post<EstatePropertyListResponse>(`${environment.url + PortalMenus.API_SETTINGS}properties`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  createEstateProperty(currentUser: User, request: EstatePropertyRequest): Observable<GeneralResponse> {
    request.createdBy = currentUser.username;
    request.recordId = request.estateId + "-" + request.blockId + "-" + request.propertyNo;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'CREATE_PROPERTY_BLOCK');
    this.logger.info('create estate property request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_SETTINGS}createproperty`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  updateEstateProperty(currentUser: User, request: EstatePropertyRequest): Observable<GeneralResponse> {
    request.lastModifiedBy = currentUser.username;

    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'UPDATE_PROPERTY_BLOCK');
    this.logger.info('update estate property request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_SETTINGS}updateproperty`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  deleteEstateProperty(currentUser: User, recordId: string): Observable<GeneralResponse> {
    const request = new GeneralDeleteRequest();
    request.recordId = recordId;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'DELETE_PROPERTY_BLOCK');
    this.logger.info('delete estate property request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_SETTINGS}deleteproperty`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }






  getEstateClass(): any {
    return [
      { dataValue: 'FIRST_CLASS', dataLabel: 'First Class' },
      { dataValue: 'SECOND_CLASS', dataLabel: 'Second Class' },
      { dataValue: 'THIRD_CLASS', dataLabel: 'Third Class' },
    ];
  }

  getGender(): any {
    return [
      { dataValue: 'MALE', dataLabel: 'Male' },
      { dataValue: 'FEMALE', dataLabel: 'Female' },
    ];
  }

  getStatus(): any {
    return [
      { dataValue: 'ACTIVE', dataLabel: 'Active' },
      { dataValue: 'INACTIVE', dataLabel: 'Inactive' },
    ];
  }

  getMaritalStatus(): any {
    return [
      { dataValue: 'SINGLE', dataLabel: 'Single' },
      { dataValue: 'MARRIED', dataLabel: 'Married' },
      { dataValue: 'DIVORCED', dataLabel: 'Divorced' },
      { dataValue: 'OTHERS', dataLabel: 'Others' },
    ];
  }

  getRelationships(): any {
    return [
      { dataValue: 'FATHER', dataLabel: 'Father' },
      { dataValue: 'MOTHER', dataLabel: 'Mother' },
      { dataValue: 'GUARDIAN', dataLabel: 'Guardian' },
      { dataValue: 'OTHERS', dataLabel: 'Others' },
    ];
  }

  getIdTypes(): any {
    return [
      { dataValue: 'NATIONAL_PASSPORT', dataLabel: 'National Passport' },
      { dataValue: 'NATIONAL_HEALTH_INSURANCE', dataLabel: 'National Health Insurance' },
      { dataValue: 'VOTERS_ID', dataLabel: 'Voters Id' },
      { dataValue: 'DRIVERS_LICENCE', dataLabel: 'Drivers Licence' },
    ];
  }

  getPropertyCategories(): any {
    return [
      { dataValue: 'LAND', dataLabel: 'Land' },
      { dataValue: 'HOUSE', dataLabel: 'House' },
    ];
  }



  getOccupantType(): any {
    return [
      { dataValue: 'LESSEE', dataLabel: 'Lessee' },
      { dataValue: 'TENANT', dataLabel: 'Tenant' },
    ];
  }

  getOccupationType(): any {
    return [
      { dataValue: 'Leasehold', dataLabel: 'Leasehold' },
      { dataValue: 'Rental', dataLabel: 'Rental' },
    ];
  }

  getPropertyUsage(): any {
    return [
      { dataValue: 'RESIDENTIAL', dataLabel: 'Residential' },
      { dataValue: 'COMMERCIAL', dataLabel: 'Commercial' },
      { dataValue: 'INSTITUTIONAL', dataLabel: 'Institutional' },
      { dataValue: 'MIXED_USE', dataLabel: 'Mixed Use' },
      { dataValue: 'ALL', dataLabel: 'All' },
    ];
  }

  getModeOfPayments(): any {
    return [
      { dataValue: 'CASH', dataLabel: 'Cash' },
      { dataValue: 'MOBILE_MONEY', dataLabel: 'Mobile Money' },
      { dataValue: 'CHEQUE', dataLabel: 'Cheque' },
      { dataValue: 'BANKERS_DRAFT', dataLabel: 'Bankers Draft' },
    ];
  }
  getGroupRentBillTypes(): any {
    return [
      { dataValue: 'EST', dataLabel: 'Estate' },
      { dataValue: 'BLK', dataLabel: 'Block' },
      { dataValue: 'PRO', dataLabel: 'Property' },
    ];
  }

  getUserRoles(): any {
    return [
      { dataValue: 'ADMINISTRATOR', dataLabel: 'Administrator' },
      { dataValue: 'DIRECTOR', dataLabel: 'Director' },
      { dataValue: 'ESTATE_OFFICER', dataLabel: 'Estate Officer' },
      { dataValue: 'ACCOUNTANT', dataLabel: 'Accountant' },
      { dataValue: 'AUDITOR', dataLabel: 'Auditor' },
    ];
  }
  getDepartments(): any {
    return [
      { dataValue: 'ADMINISTRATION', dataLabel: 'Administration' },
      { dataValue: 'ESTATE_OFFICE', dataLabel: 'Estate Office' },
      { dataValue: 'FINANCE', dataLabel: 'Finance' },
      { dataValue: 'COMPLIANCE', dataLabel: 'Compliance' },
    ];
  }

  getGhanaRegions(): any {
    return [
      { dataValue: 'AHAFO_REGION', dataLabel: 'Ahafo Region' },
      { dataValue: 'ASHANTI_REGION', dataLabel: 'Ashanti Region' },
      { dataValue: 'BONO_EAST_REGION', dataLabel: 'Bono East Region' },
      { dataValue: 'BONO_REGION', dataLabel: 'Bono Region' },
      { dataValue: 'CENTRAL_REGION', dataLabel: 'Central Region' },
      { dataValue: 'EASTERN_REGION', dataLabel: 'Eastern Region' },
      { dataValue: 'GREATER_ACCRA', dataLabel: 'Greater Accra' },
      { dataValue: 'NORTHERN_REGION', dataLabel: 'Northern Region' },
      { dataValue: 'NORTH_EAST_REGION', dataLabel: 'North East Region' },
      { dataValue: 'OTI_REGION', dataLabel: 'Oti Region' },
      { dataValue: 'UPPER_EAST_REGION', dataLabel: 'Upper East Region' },
      { dataValue: 'UPPER_WEST_REGION', dataLabel: 'Upper West Region' },
      { dataValue: 'WESTERN_REGION', dataLabel: 'Western Region' },
      { dataValue: 'WESTERN_NORTH_REGION', dataLabel: 'Western North Region' },
      { dataValue: 'SAVANNAH_REGION', dataLabel: 'Savannah Region' },
      { dataValue: 'VOLTA_REGION', dataLabel: 'Volta Region' },
    ];
  }




}
