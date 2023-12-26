import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddItemComponent } from "../../@shared/components/add-item.component";
import { ListFilterPipe } from 'src/app/@shared/pipes/list-filter.pipe';
import { FormsModule } from '@angular/forms';
import { FormLabelComponent } from "../../@shared/components/form-label.component";
import { NgSelectModule } from '@ng-select/ng-select';
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
import { PaymentDetailsComponent } from '../payment-records/payment-details.component';
import { ExcelExporterService } from 'src/app/@services/excel-exporter.service';
import { Bills } from 'src/app/@models/bill-payment/bills';
import { BillsResponse } from 'src/app/@restmodels/bill-payment/bills.response';
import { BillsRequest } from 'src/app/@restmodels/bill-payment/bills.request';
import { OccupantPropertyDetailsComponent } from 'src/app/@shared/components/occupant-property-details/occupant-property-details.component';
import { PayBillComponent } from '../pay-bill/pay-bill.component';
import { BillDetailsComponent } from './bill-details.component';
import { StatusStylePipe } from "../../@shared/pipes/status-style.pipe";
import { DemandNoticeRequest } from 'src/app/@restmodels/bill-payment/demand-notice.request';
import { PayBillRequest } from 'src/app/@restmodels/bill-payment/pay-bill.request';

@Component({
    standalone: true,
    templateUrl: './outstanding-bills.component.html',
    imports: [ CommonModule, AddItemComponent, ListFilterPipe, FormsModule,
        FormLabelComponent, TableModule, OccupantPropertyDetailsComponent,
        NgSelectModule, AvatarNamePipe, AvatarBgPipe, TimeAgoPipe,
        RemoveHyphenPipe, FullNameComponent, StatusStylePipe,  ]
})
export class OutstandingBillsComponent implements OnInit, OnDestroy {


    currentUser: User;
    listOfOccupantProperties: OccupantProperty[];
    listOfPropertyLedgers: PropertyLedger[];
    listOfOutstandingBills: Bills[];

    searchParameter: string;
    searchParameterLabel: string;
    searchBy: string;

    startDate: Date;
    endDate: Date;

    currentYear: number;

    response: OccupantPropertyListResponse;
    isSearching: boolean;
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
    addPaymentBsModalRef: BsModalRef;
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
        // this.selectedOccupant = JSON.parse(localStorage.getItem("payBill")) ?? null;
        this.selectedOccupant = JSON.parse(localStorage.getItem("selectedOccupant")) ?? null;
        if (this.selectedOccupant) {
            this.searchTerm = this.selectedOccupant.propertyId;
            this.searchAllOccupantBills();
        }
        this.showOccupantDetails = true;
        this.showNoRecordsFound = false;
    }

    trackByFn(item: OccupantProperty) {
        return item.occupantName;
    }

    searchOccupant() {
        localStorage.removeItem("payBill");
        this.selectedOccupant = new OccupantProperty();
        this.showOccupantDetails = false;
        this.showNoRecordsFound = false;
        this.listOfOccupantProperties = [];
        this.listOfOutstandingBills = [];

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

    cancelButton(): void {
        this.showOccupantDetails = false
        this.selectedOccupant = new OccupantProperty();
        this.listOfOccupantProperties = [];
        this.listOfPropertyLedgers = [];
    }

    openPayBillComponent(bill: Bills) {
        let payBill = new PayBillRequest(bill, null);
        payBill.payerName = this.selectedOccupant.occupantName;
        payBill.paymentType = this.selectedOccupant.paymentType;
        //use it to refresh the outstanding bills list
        localStorage.setItem("selectedOccupant", JSON.stringify(this.selectedOccupant));

        const initialState: ModalOptions = {
            initialState: {
                isAddMode: true,
                payBill,
            }
        };
        this.modalService.config.ignoreBackdropClick = true;
        this.modalService.config.animated = true;
        this.addPaymentBsModalRef = this.modalService.show(PayBillComponent, initialState);
        this.addPaymentBsModalRef.content.closeBtnName = 'Close';
    }

    printDemandNotice(bill: Bills): void {
        const request = new DemandNoticeRequest();
        request.searchParameter = "PID";
        request.searchValue = bill.property;
        request.billYear = bill.billYear;
        request.billMonth = bill.billMonth;
        request.billType = bill.billType;
        this.billPaymentService.generateJasperReport(this.currentUser, request);
    }

    openBillDetailsComponent(bills: Bills) {
        const initialState: ModalOptions = {
            initialState: {
                bills,
                occupant: this.selectedOccupant
            }
        };
        this.modalService.config.ignoreBackdropClick = true;
        this.modalService.config.animated = true;
        this.modalRef = this.modalService.show(BillDetailsComponent, initialState);
        this.modalRef.content.closeBtnName = 'Close';
    }


    export(): void {
        // let Heading = [ [ 'brandId', 'Contact', 'City', 'Location', 'Digital Address', 'Created By', 'Created Date', 'Last Modified By', 'Last Modified Date' ] ];
        this.excelExporterService.exportAsExcelFile(this.listOfOutstandingBills, "outstanding-bills");
    }


    searchAllOccupantBills(): void {
        this.listOfOutstandingBills = [];
        this.totalCredit = 0;
        this.totalDebit = 0;
        this.currentBal = 0;
        this.balance = 0;
        let request = new BillsRequest();
        request.occupantId = this.selectedOccupant.occupantId;
        request.propertyId = this.selectedOccupant.propertyId;
        this.billPaymentService.fetchOutstandingBills(this.currentUser, request).subscribe({
            next: (res: BillsResponse) => {
                this.logger.info(`fetchOutstandingBills response ` + JSON.stringify(res))
                if (res.headerResponse.responseCode !== '000') {
                    this.alertService.error(res.headerResponse.responseMessage);
                    return;
                }
                if (res.listOfBills.length <= 0) {
                    let msg = `No bills found `;
                    this.alertService.showInfoMsgGeneral(msg);
                    this.logger.info(msg);
                    return;
                }
                this.listOfOutstandingBills = res.listOfBills;
                this.balance = this.totalDebit - this.totalCredit;
            },
            error: error => {
                this.logger.error(error);
                this.alertService.showInfoMsg(error);
            }
        });
    }

 
    openPaymentDetailsComponent(propertyLedger: PropertyLedger, selectedOccupant: OccupantProperty) {

        const initialState: ModalOptions = {
            initialState: {
                propertyLedger,
                selectedOccupant
            }
        };
        this.modalService.config.ignoreBackdropClick = true;
        this.modalService.config.animated = true;
        this.modalRef = this.modalService.show(PaymentDetailsComponent, initialState);
        this.modalRef.content.closeBtnName = 'Close';
    }
    searchParameterListener(): void {
        if (this.searchParameter == "receiptNumberIssued") {
            this.searchParameterLabel = "Receipt Number"
            return;
        }
        if (this.searchParameter == "mediumOfPaymentNumber") {
            this.searchParameterLabel = "Mode of Payment Number";
            return;
        }
    }


}


