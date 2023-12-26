import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
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
import Swal from 'sweetalert2';
import { BillPaymentService } from 'src/app/@services/bill-payment.service';
import { PropertyLedgerEntriesResponse } from 'src/app/@restmodels/bill-payment/property-ledger-entries.response';
import { PropertyLedger } from 'src/app/@models/bill-payment/property-ledger';
import { PropertyLedgerEntriesRequest } from 'src/app/@restmodels/bill-payment/property-ledger-entries.request';
import { TimeAgoPipe } from "../../@shared/pipes/time-ago.pipe";
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaymentDetailsComponent } from './payment-details.component';
import { PayBillComponent } from '../pay-bill/pay-bill.component';
import { PayBillRequest } from 'src/app/@restmodels/bill-payment/pay-bill.request';
import { ReversePayBillRequest } from 'src/app/@restmodels/bill-payment/reverse-pay-bill.request';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { PortalMenus } from 'src/app/@models/portalMenus';

@Component({
  standalone: true,
  templateUrl: './payment-records.component.html',
  imports: [ CommonModule, PageTitleComponent, FormLabelComponent, NgSelectModule, TooltipModule,
    FormsModule, CalendarModule, AddItemComponent, TableModule, ListFilterPipe, FullNameComponent,
    RemoveHyphenPipe, TimeAgoPipe ]
})
export class PaymentRecordsComponent implements OnInit, OnDestroy {

  currentUser: User;
  billPayments: PropertyLedger[];
  searchedKeyword: string;
  isAddMode: boolean;
  startDate: Date;
  endDate: Date;

  searchBy: string;
  searchParameter: string = "BAB";
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
    public bsModalRef: BsModalRef,
    public viewOccupantPropertyBsModalRef: BsModalRef,
    private addOccupantPropertyModalService: BsModalService,
    private modalService: BsModalService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.startDate = this.utilsService.getFirstDayDate();
    this.endDate = new Date();
    this.block = localStorage.getItem("block") ?? null;
    this.estate = localStorage.getItem("estate") ?? null;
    if (this.block) {
      this.searchParameter = "BAB";
      this.fetchEstates();
      this.fetchEstateBlocks();
      this.searchBillPayments();

    } else {
      this.estate = "A";
      this.block = "A";
      this.searchParameter == "BAB";
      this.searchParameterListener();
    }
    
    this.totalCredit = 0.0;
    this.totalDebit = 0.0;
    this.balance = 0.0;
  }


  ngOnDestroy(): void {
    this.addOccupantPropertyModalService.hide();
    Swal.close();
    // localStorage.removeItem("block");
    // localStorage.removeItem("estate");
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
    request.searchValue = this.searchValue;
    request.endDate = this.endDate;
    request.startDate = this.startDate;
    request.occupantId = "";
    request.propertyId = "";
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
    this.excelExporterService.exportAsExcelFile(this.billPayments, "bill-payments");
  }

  printDemandNotice(): void {
    this.billPaymentService.generateJasperReport(this.currentUser, null);
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


  openPrintReceipt(payment: PropertyLedger) {

  }



  openReverseBillPayment(payment: PropertyLedger): void {


    let propertyName = payment.propertyId;
    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `Do you want to reverse payment of GHS ${payment.amountPaid} for ${propertyName}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, reverse',
    }).then((result) => {
      if (result.value) {
        // reset alerts on submit
        this.alertService.clear();
        let request = new ReversePayBillRequest();
        request.billId = payment.bill;
        request.ledgerId = payment.recordId;


        this.billPaymentService.reverseBillPayment(this.currentUser, request)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('reverseBillPayment response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(res.headerResponse.responseMessage);
              this.logAction(`Reversed payment of  ${payment.amountPaid} of bill ${payment.bill}, ${payment.paymentFor}`, PortalMenus.BILL_PAYMENTS);
              this.accountService.reloadCurrentRoute();
            },
            error: error => {
              this.alertService.showInfoMsg(error.message);
            }
          });

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });
  }


  openEditPaymentModalComponent(paymentLedger: PropertyLedger) {
    let payBill = new PayBillRequest(null, paymentLedger);
    localStorage.setItem('block', this.block);
    localStorage.setItem('estate', this.estate);
    const initialState: ModalOptions = {
      initialState: {
        isAddMode: false,
        payBill
      }
    };
    this.modalService.config.ignoreBackdropClick = true;
    this.modalService.config.animated = true;
    this.bsModalRef = this.modalService.show(PayBillComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  openPaymentDetailsModalComponent(propertyLedger: PropertyLedger) {
    const initialState: ModalOptions = {
      initialState: {
        propertyLedger
      }
    };
    this.modalService.config.ignoreBackdropClick = true;
    this.modalService.config.animated = true;
    this.bsModalRef = this.modalService.show(PaymentDetailsComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }




  async logAction(msg: string, ui: string): Promise<void> {
    await this.accountService.logUserAudit(msg, ui);
  }
}
