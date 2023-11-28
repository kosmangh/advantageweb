import { PropertyLedgerEntriesResponse } from './../@restmodels/bill-payment/property-ledger-entries.response';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeneralResponse } from '../@restmodels/general.response';
import { User } from '../@models/user';
import { PortalMenus } from '../@models/portalMenus';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { UtilsService } from './utils.service';
import { PayBillRequest } from '../@restmodels/bill-payment/pay-bill.request';
import { PropertyLedgerEntriesRequest } from '../@restmodels/bill-payment/property-ledger-entries.request';
import { GeneralRequest } from '../@restmodels/general.request';
import { DemandNoticeRequest } from '../@restmodels/bill-payment/demand-notice.request';
import { DemandNoticeResponse } from '../@restmodels/bill-payment/demand-notice.response';

@Injectable({
  providedIn: 'root'
})
export class BillPaymentService {

  constructor(
    private utilsService: UtilsService,
    private http: HttpClient,
    private logger: NGXLogger,
  ) {

  }

  payBill(currentUser: User, request: PayBillRequest): Observable<GeneralResponse> {
    request.createdBy = currentUser.username;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'PAY_BILL');
    this.logger.info('payBill request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_BILL_PAYMENT}paybill`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  updatePayBill(currentUser: User, request: PayBillRequest): Observable<GeneralResponse> {
    request.createdBy = currentUser.username;
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'UPDATE_PAY_BILL');
    this.logger.info('payBill request ' + JSON.stringify(request));
    return this.http.post<GeneralResponse>(`${environment.url + PortalMenus.API_BILL_PAYMENT}paybill`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  fetchPropertyEntries(currentUser: User, request: PropertyLedgerEntriesRequest): Observable<PropertyLedgerEntriesResponse> {
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'PROPERTY_LEDGER_ENTRIES');
    this.logger.info('fetchPropertyEntries request ' + JSON.stringify(request));
    return this.http.post<PropertyLedgerEntriesResponse>(`${environment.url + PortalMenus.API_BILL_PAYMENT}propertledgerentries`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  fetchAllPropertyEntries(currentUser: User, request: PropertyLedgerEntriesRequest): Observable<PropertyLedgerEntriesResponse> {
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'ALL_PROPERTY_LEDGER_ENTRIES');
    this.logger.info('fetchPropertyEntries request ' + JSON.stringify(request));
    return this.http.post<PropertyLedgerEntriesResponse>(`${environment.url + PortalMenus.API_BILL_PAYMENT}allpropertledgerentries`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }


  fetchBillPayments(currentUser: User, request: PropertyLedgerEntriesRequest): Observable<PropertyLedgerEntriesResponse> {
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'BILL_PAYMENTS');
    this.logger.info('fetchPropertyEntries request ' + JSON.stringify(request));
    return this.http.post<PropertyLedgerEntriesResponse>(`${environment.url + PortalMenus.API_BILL_PAYMENT}billpayments`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  generateDemandNotice(currentUser: User, request: DemandNoticeRequest): Observable<DemandNoticeResponse> {
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'GENERATE_DEMAND_NOTICE');
    this.logger.info('DemandNoticeRequest request ' + JSON.stringify(request));
    return this.http.post<DemandNoticeResponse>(`${environment.url + PortalMenus.API_BILL_PAYMENT}demandnotice`, request)
      .pipe(
        timeout(environment.timeout),
      );
  }

  generateJasperReport(currentUser: User,request: DemandNoticeRequest) {
    request.headerRequest = this.utilsService.getRequestHeader(currentUser.zoneId, currentUser.regionId, 'PRINT_DEMAND_NOTICE_REPORT');
    this.http.post(`${environment.url}/reports/generatedemandnoticereport`, request, { responseType: 'blob' })
      .subscribe(response => {
        // Open the PDF response in a new browser tab
        const file = new Blob([ response ], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
  }


}
