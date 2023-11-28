import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { Occupant } from 'src/app/@models/occupancy/occupant';
import { OccupantProperty } from 'src/app/@models/occupancy/occupant-property';
import { Estate } from 'src/app/@models/settings/estate';
import { EstateBlock } from 'src/app/@models/settings/estate-block';
import { User } from 'src/app/@models/user';
import { EstateBlockListResponse } from 'src/app/@restmodels/settings/estate-block-list.response';
import { EstateListResponse } from 'src/app/@restmodels/settings/estate-list.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { ExcelExporterService } from 'src/app/@services/excel-exporter.service';
import { OccupancyService } from 'src/app/@services/occupancy.service';
import { SettingsService } from 'src/app/@services/settings.service';
import { UtilsService } from 'src/app/@services/utils.service';
import { AddItemComponent } from 'src/app/@shared/components/add-item.component';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { FullNameComponent } from 'src/app/@shared/components/full-name.component';
import { PageTitleComponent } from 'src/app/@shared/components/page-title.component';
import { ListFilterPipe } from 'src/app/@shared/pipes/list-filter.pipe';
import { RemoveHyphenPipe } from 'src/app/@shared/pipes/remove-hyphen.pipe';
import { AddOccupantPropertyComponent } from 'src/app/occupancy/occupant-properties/add-occupant-property.component';
import { ViewOccupantPropertyComponent } from 'src/app/occupancy/occupant-properties/view-occupant-property.component';
import { AddInstitutionOccupantComponent } from 'src/app/occupancy/occupants/add-institution-occupant.component';
import Swal from 'sweetalert2';
import { BillPaymentService } from 'src/app/@services/bill-payment.service';
import { PropertyLedgerEntriesResponse } from 'src/app/@restmodels/bill-payment/property-ledger-entries.response';
import { PropertyLedger } from 'src/app/@models/estate-billing/property-ledger';
import { PropertyLedgerEntriesRequest } from 'src/app/@restmodels/bill-payment/property-ledger-entries.request';
import { TimeAgoPipe } from "../../@shared/pipes/time-ago.pipe";
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  standalone: true,
  templateUrl: './payment-records.component.html',
  imports: [ CommonModule, PageTitleComponent, FormLabelComponent, NgSelectModule, TooltipModule,
    FormsModule, CalendarModule, AddItemComponent, TableModule, ListFilterPipe, FullNameComponent, RemoveHyphenPipe, TimeAgoPipe ]
})
export class PaymentRecordsComponent implements OnInit, OnDestroy {

  currentUser: User;
  billPayments: PropertyLedger[];
  searchedKeyword: string;
  bsModalRef?: BsModalRef;
  isAddMode: boolean;
  startDate: Date;
  endDate: Date;

  searchBy: string;
  searchParameter: string = "receiptNumberIssued";
  searchParameterLabel: string;
  searchValue: string;
  estate: string;
  block: string;
  showOccupantSearchBy: boolean = true;
  listOfEstateBlocks: EstateBlock[];
  listOfEstates: Estate[];

  settingsService = inject(SettingsService);
  excelExporterService = inject(ExcelExporterService);
  accountService = inject(AuthService);
  alertService = inject(AlertService);
  utilsService = inject(UtilsService);
  occupantsService = inject(OccupancyService);
  totalCredit: string | number;
  totalDebit: string | number;
  balance: string | number;
  constructor(
    private billPaymentService: BillPaymentService,
    private logger: NGXLogger,
    public addOccupantPropertyBsModalRef: BsModalRef,
    public addInstitutionOccupantBsModalRef: BsModalRef,
    public viewOccupantPropertyBsModalRef: BsModalRef,
    private addOccupantPropertyModalService: BsModalService,
    private institutionOccupantModalService: BsModalService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.searchParameter == "receiptNumberIssued";
    this.startDate = this.utilsService.getFirstDayDate();
    this.endDate = new Date();
    this.estate = "A";
    this.block = "A";
    this.totalCredit = 0.0;
    this.totalDebit = 0.0;
    this.balance = 0.0;
    this.searchParameterListener();
  }


  ngOnDestroy(): void {
    this.addOccupantPropertyModalService.hide();
    Swal.close();
  }




  searchParameterListener(): void {

    if (this.searchParameter == "receiptNumberIssued") {
      this.searchParameterLabel = "Receipt No.";
      return;
    }
    if (this.searchParameter == "mediumOfPaymentNumber") {
      this.searchParameterLabel = "Payment Mode No.";
      return;
    }
    if (this.searchParameter == "BAB") {
      this.estate = "A";
      this.block = "A";
      this.fetchEstates();
      this.listOfEstateBlocks = [];
    }
  }

  searchBillPayments(): void {
    this.billPayments = [];
    const request = new PropertyLedgerEntriesRequest();
    request.searchBy = this.searchParameter;
    request.searchValue=this.searchValue;
    request.endDate = this.endDate;
    request.startDate = this.startDate;
    request.occupantId = "";
    request.propertyId="";
    if (this.searchParameter == "BAB") {
      request.searchValue = this.block;
    }
    request.propertyId = this.block;
    this.billPaymentService.fetchBillPayments(this.currentUser, request).subscribe({
      next: (res: PropertyLedgerEntriesResponse) => {
        this.logger.info(`fetchBillPayments response ` + JSON.stringify(res));
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.showErrorMsg(res.headerResponse.responseMessage);
          return;
        }
        if (res.propertyLedgers.length <= 0) {
          this.alertService.showInfoMsgGeneral("No payments found");
          this.logger.info("No payments found");
          return;
        }
        this.billPayments = res.propertyLedgers;
        this.totalCredit = res.totalCredit;
        this.totalDebit = res.totalDebit;
        this.balance = res.currentBalance;
      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }

  export(): void {
    // let Heading = [ [ 'brandId', 'Contact', 'City', 'Location', 'Digital Address', 'Created By', 'Created Date', 'Last Modified By', 'Last Modified Date' ] ];
    this.excelExporterService.exportAsExcelFile(this.billPayments, "occupantProperties");
  }

  printDemandNotice(): void {
    this.billPaymentService.generateJasperReport(this.currentUser,null);
  }
  
  fetchEstates(): void {
    this.listOfEstates = [];
    this.settingsService.getEstates().subscribe({
      next: (res: EstateListResponse) => {
        this.logger.info(`getEstates response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.estates.length <= 0) {
          this.alertService.showInfoMsgGeneral("No zones found");
          this.logger.info("No zones found");
          return;
        }
        this.listOfEstates = res.estates;
      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }

  fetchEstateBlocks(): void {
    this.listOfEstateBlocks = [];
    this.settingsService.getEstateBlocks(this.currentUser, this.estate).subscribe({
      next: (res: EstateBlockListResponse) => {
        this.logger.info(`getEstates response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.estateBlocks.length <= 0) {
          this.alertService.showInfoMsgGeneral("No blocks found");
          this.logger.info("No blocks found ");
          return;
        }
        this.listOfEstateBlocks = res.estateBlocks;
      },
      error: error => {
        this.logger.error(error.message);
        this.alertService.showInfoMsg(error.message);
      }
    });
  }


  openOccupantPropertyModalComponent(occupantProperty: OccupantProperty, isAddMode: boolean) {
    const initialState: ModalOptions = {
      initialState: {
        isAddMode,
        occupantProperty
      }
    };
    this.addOccupantPropertyModalService.config.ignoreBackdropClick = true;
    this.addOccupantPropertyModalService.config.animated = true;
    this.addOccupantPropertyBsModalRef = this.addOccupantPropertyModalService.show(AddOccupantPropertyComponent, initialState);
    this.addOccupantPropertyBsModalRef.content.closeBtnName = 'Close';
  }

  openInstitutionModalComponent(occupant: Occupant, isAddMode: boolean) {
    const initialState: ModalOptions = {
      initialState: {
        isAddMode,
        occupant
      }
    };
    this.institutionOccupantModalService.config.ignoreBackdropClick = true;
    this.institutionOccupantModalService.config.animated = true;
    this.addInstitutionOccupantBsModalRef = this.institutionOccupantModalService.show(AddInstitutionOccupantComponent, initialState);
    this.addInstitutionOccupantBsModalRef.content.closeBtnName = 'Close';
  }

  openViewOccupantModalComponent(occupantProperty: OccupantProperty) {
    const initialState: ModalOptions = {
      initialState: {
        occupantProperty
      }
    };
    this.institutionOccupantModalService.config.ignoreBackdropClick = true;
    this.institutionOccupantModalService.config.animated = true;
    this.viewOccupantPropertyBsModalRef = this.institutionOccupantModalService.show(ViewOccupantPropertyComponent, initialState);
    this.viewOccupantPropertyBsModalRef.content.closeBtnName = 'Close';
  }



  async logAction(msg: string, ui: string): Promise<void> {
    await this.accountService.logUserAudit(msg, ui);
  }
}
