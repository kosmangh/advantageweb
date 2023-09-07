import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeneralResponse } from '../@restmodels/general.response';
import { User } from '../@models/user';
import { PortalMenus } from '../@models/portalMenus';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { UtilsService } from './utils.service';
import { GroundRentalBillListResponse } from '../@restmodels/estate-billing/ground-rental-bill-list.response';
import { RentalBillRequest } from '../@restmodels/estate-billing/rental-bill.request';
import { RentalBillListRequest } from '../@restmodels/estate-billing/rental-bill-list.request';
import { RentalBillBackRequest } from '../@restmodels/estate-billing/rental-back-bill.request';

@Injectable({
  providedIn: 'root'
})
export class RentalBillService {

  constructor(
    private utilsService: UtilsService,
    private http: HttpClient,
    private logger: NGXLogger,
  ) {

  }

  saveRentalBill(currentUser: User, request: RentalBillRequest): Observable<GeneralResponse> {
    request.createdBy = currentUser.username;
    request.billingType = "PROP";
    request.estateId = "ALL";
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'SAVE_RENTAL_BILL');
    this.logger.info('saveRentalBill request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_ESTATE_BILLING}applyrentalbill`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  applyBackRentalBill(currentUser: User, request: RentalBillBackRequest): Observable<GeneralResponse> {
    request.createdBy = currentUser.username;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'APPLY_BACK_RENTAL_BILL');
    this.logger.info('applyBackRentalBill request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_ESTATE_BILLING}applybackrentalbill`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  

  applyLastRentBilled2CurrentMonth(currentUser: User): Observable<GeneralResponse> {
    //To be changed in future
    const request = new RentalBillRequest();
    request.createdBy = currentUser.username;
    request.billingType = "PROP";
    request.estateId = "ALL";
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'SAVE_RENTAL_BILL');
    this.logger.info('saveRentalBill request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_ESTATE_BILLING}applylastrentalbill`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }


  getRentalBills(currentUser: User, rentMonth: string, chargeYear: number): Observable<GroundRentalBillListResponse> {
    const request = new RentalBillListRequest();
    request.rentMonth = rentMonth;
    request.rentYear = chargeYear;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'RENTAL_BILL_LIST');
    this.logger.info('getGroundRentBills list request ' + JSON.stringify(request));
    return this.http.post<GroundRentalBillListResponse>(`${environment.url + PortalMenus.API_ESTATE_BILLING}rentalbills`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }


}
