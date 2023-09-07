import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeneralResponse } from '../@restmodels/general.response';
import { User } from '../@models/user';
import { PortalMenus } from '../@models/portalMenus';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { UtilsService } from './utils.service';
import { GroundRentBillRequest } from '../@restmodels/estate-billing/ground-rent-bill.request';
import { GroundRentBillListRequest } from '../@restmodels/estate-billing/ground-rent-bill-list.request';
import { GroundRentalBillListResponse } from '../@restmodels/estate-billing/ground-rental-bill-list.response';

@Injectable({
  providedIn: 'root'
})
export class GroupRentBillingService {

  constructor(
    private utilsService: UtilsService,
    private http: HttpClient,
    private logger: NGXLogger,
  ) {

  }

  saveGroupRentBill(currentUser: User, request: GroundRentBillRequest): Observable<GeneralResponse> {
    request.createdBy = currentUser.username;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'SAVE_GROUND_RENT_BILL');
    request.headerRequest.region=currentUser.regionId;
    this.logger.info('saveGroupRentBill request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_ESTATE_BILLING}applygroundrentbill`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }


  getGroundRentBills(currentUser: User, blockId: string, chargeYear: number): Observable<GroundRentalBillListResponse> {
    const request = new GroundRentBillListRequest();
    request.blockId = blockId;
    request.chargeYear = chargeYear;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'GROUND_RENT_BILL_LIST');
    this.logger.info('getGroundRentBills list request ' + JSON.stringify(request));
    return this.http.post<GroundRentalBillListResponse>(`${environment.url + PortalMenus.API_ESTATE_BILLING}groundrentbills`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }


}
