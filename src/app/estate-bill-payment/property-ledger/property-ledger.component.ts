import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddItemComponent } from "../../@shared/components/add-item.component";
import { ListFilterPipe } from 'src/app/@shared/pipes/list-filter.pipe';
import { FormsModule } from '@angular/forms';
import { FormLabelComponent } from "../../@shared/components/form-label.component";
import { OccupantProperty } from 'src/app/@models/occupancy/occupant-property';
import { AvatarNamePipe } from "../../@shared/pipes/avatar-name.pipe";
import { OccupantPropertyListResponse } from 'src/app/@restmodels/occupancy/occupant-property-list.response';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { User } from 'src/app/@models/user';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { OccupancyService } from 'src/app/@services/occupancy.service';
import { SettingsService } from 'src/app/@services/settings.service';
import { UtilsService } from 'src/app/@services/utils.service';
import { AvatarBgPipe } from "../../@shared/pipes/avatar-bg.pipe";
import { TimeAgoPipe } from "../../@shared/pipes/time-ago.pipe";
import { RemoveHyphenPipe } from "../../@shared/pipes/remove-hyphen.pipe";
import { PropertyLedger } from 'src/app/@models/bill-payment/property-ledger';
import { FullNameComponent } from "../../@shared/components/full-name.component";
import { TableModule } from 'primeng/table';
import { BillPaymentService } from 'src/app/@services/bill-payment.service';
import { PropertyLedgerEntriesRequest } from 'src/app/@restmodels/bill-payment/property-ledger-entries.request';
import { PropertyLedgerEntriesResponse } from 'src/app/@restmodels/bill-payment/property-ledger-entries.response';
import { PaymentDetailsComponent } from '../payment-records/payment-details.component';
import { ExcelExporterService } from 'src/app/@services/excel-exporter.service';
import { Bills } from 'src/app/@models/bill-payment/bills';
import { BillsResponse } from 'src/app/@restmodels/bill-payment/bills.response';
import { BillsRequest } from 'src/app/@restmodels/bill-payment/bills.request';
import { OccupantPropertyDetailsComponent } from 'src/app/@shared/components/occupant-property-details/occupant-property-details.component';
import { StatusStylePipe } from "../../@shared/pipes/status-style.pipe";
import { DemandNoticeRequest } from 'src/app/@restmodels/bill-payment/demand-notice.request';
import { BillDetailsComponent } from '../bills/bill-details.component';
import { PayBillComponent } from '../pay-bill/pay-bill.component';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PropertyLedgerDetailsComponent } from './property-ledger-details.component';

@Component({
  standalone: true,
  templateUrl: './property-ledger.component.html',
  imports: [ CommonModule, AddItemComponent, ListFilterPipe, FormsModule,
    FormLabelComponent, TableModule, OccupantPropertyDetailsComponent,
    AvatarNamePipe, AvatarBgPipe, TimeAgoPipe, TooltipModule,
    RemoveHyphenPipe, FullNameComponent, StatusStylePipe, CalendarModule ]
})
export class PropertyLedgerComponent implements OnInit, OnDestroy {
  searchOccupantPayments() {
    throw new Error('Method not implemented.');
  }


  currentUser: User;
  listOfOccupantProperties: OccupantProperty[];
  listOfPropertyLedgers: PropertyLedger[];

  searchParameter: string;
  searchParameterLabel: string;
  searchBy: string;

  startDate: Date;
  endDate: Date;

  currentYear: number;

  response: OccupantPropertyListResponse;
  searchTerm: string;


  totalCredit: number;
  totalDebit: number;
  balance: number;
  currentBal: number;

  selectedOccupant: OccupantProperty;
  searchedKeyword: string;
  showOccupantDetails: boolean;
  searchValue: string;

  showNoRecordsFound: boolean;
  modalRef: BsModalRef;

  excelExporterService = inject(ExcelExporterService);
  settingsService = inject(SettingsService);
  accountService = inject(AuthService);
  alertService = inject(AlertService);
  utilsService = inject(UtilsService);
  occupantsService = inject(OccupancyService);
  constructor(
    private billPaymentService: BillPaymentService,
    private modalService: BsModalService,
    private logger: NGXLogger,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }


  ngOnDestroy(): void {
    this.modalService.hide();
  }


  ngOnInit(): void {
    this.startDate = this.utilsService.getFirstDayDate();
    this.endDate = new Date();
    this.selectedOccupant = JSON.parse(localStorage.getItem("selectedOccupant")) ?? null;
    if (this.selectedOccupant) {
      this.searchAllOccupantBills();
    }
    this.showOccupantDetails = true;
    this.showNoRecordsFound = false;
  }


  searchOccupant() {
    this.selectedOccupant = new OccupantProperty();
    this.showOccupantDetails = false;
    this.showNoRecordsFound = false;
    this.listOfOccupantProperties = [];
    this.listOfPropertyLedgers = [];

    this.occupantsService.quickSearchOccupantProperties(this.currentUser, this.searchTerm.trim(), 'ALL').subscribe({
      next: (res: OccupantPropertyListResponse) => {
        this.logger.info(`quickSearchOccupantProperties response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.occupantProperties.length <= 0) {
          let msg = `No occupant found `;
          this.alertService.showInfoMsgGeneral(msg);
          this.logger.info(msg);
          return;
        }
        this.listOfOccupantProperties = res.occupantProperties;
        if (this.listOfOccupantProperties.length === 1) {
          this.selectedOccupant = this.listOfOccupantProperties[ 0 ];
          this.selectOccupant(this.selectedOccupant);
        }

      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }

  selectOccupant(occupant: OccupantProperty) {
    this.listOfOccupantProperties = [];
    this.selectedOccupant = occupant;
    this.showOccupantDetails = true;
    this.searchAllOccupantBills();
  }


  openViewLedgerComponent(propertyLedger: PropertyLedger) {
    const initialState: ModalOptions = {
      initialState: {
        propertyLedger,
      }
    };
    this.modalService.config.ignoreBackdropClick = true;
    this.modalService.config.animated = true;
    this.modalRef = this.modalService.show(PropertyLedgerDetailsComponent, initialState);
    this.modalRef.content.closeBtnName = 'Close';
  }


  export(): void {
    this.excelExporterService.exportAsExcelFile(this.listOfPropertyLedgers, "property-ledgers");
  }
  searchAllOccupantBills(): void {
    this.listOfPropertyLedgers = [];
    this.totalCredit = 0;
    this.totalDebit = 0;
    this.currentBal = 0;
    this.balance = 0;
    let request = new PropertyLedgerEntriesRequest();
    request.occupantId = this.selectedOccupant.occupantId;
    request.propertyId = this.selectedOccupant.propertyId;
    request.endDate = this.endDate;
    request.startDate = this.startDate;
    request.searchBy = "DR";
    this.billPaymentService.fetchPropertyEntries(this.currentUser, request).subscribe({
      next: (res: PropertyLedgerEntriesResponse) => {
        this.logger.info(`getPropertyCharges response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.propertyLedgers.length <= 0) {
          let msg = `No ledgers found `;
          this.alertService.showInfoMsgGeneral(msg);
          this.logger.info(msg);
          return;
        }
        this.listOfPropertyLedgers = res.propertyLedgers;
        this.totalCredit = res.totalCredit;
        this.totalDebit = res.totalDebit;
        this.currentBal = res.currentBalance;
        this.balance = this.totalDebit - this.totalCredit;
      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }




}


