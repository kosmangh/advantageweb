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
import { catchError, debounceTime, distinctUntilChanged, throwError } from 'rxjs';
import { AvatarBgPipe } from "../../@shared/pipes/avatar-bg.pipe";
import { TimeAgoPipe } from "../../@shared/pipes/time-ago.pipe";
import { RemoveHyphenPipe } from "../../@shared/pipes/remove-hyphen.pipe";
import { PropertyLedger } from 'src/app/@models/estate-billing/property-ledger';
import { RentalBillService } from 'src/app/@services/rental-bill.service';
import { FullNameComponent } from "../../@shared/components/full-name.component";
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { AddPaymentComponent } from './add-payment.component';
import { BillPaymentService } from 'src/app/@services/bill-payment.service';
import { PropertyLedgerEntriesRequest } from 'src/app/@restmodels/bill-payment/property-ledger-entries.request';
import { PropertyLedgerEntriesResponse } from 'src/app/@restmodels/bill-payment/property-ledger-entries.response';
import { ViewPaymentDetailsComponent } from './view-payment-details.component';
import { ExcelExporterService } from 'src/app/@services/excel-exporter.service';

@Component({
    standalone: true,
    templateUrl: './bill-payment.component.html',
    imports: [ CommonModule, AddItemComponent, ListFilterPipe, FormsModule, FormLabelComponent, TableModule,
        NgSelectModule, AvatarNamePipe, AvatarBgPipe, TimeAgoPipe, RemoveHyphenPipe, FullNameComponent, CalendarModule ]
})
export class BillPaymentComponent implements OnInit, OnDestroy {


    currentUser: User;
    listOfOccupantProperties: OccupantProperty[];

    searchParameter: string;
    searchParameterLabel: string;
    searchBy: string;

    startDate: Date;
    endDate: Date;

    currentYear: number;

    response: OccupantPropertyListResponse;
    isSearching: boolean;
    searchTerm: string;
    listOfPropertyLedgers: PropertyLedger[];


    totalCredit: number;
    totalDebit: number;
    balance: number;
    currentBal: number;

    showSpinner: boolean;
    selectedOccupant: OccupantProperty;
    searchedKeyword: string;
    showOccupantDetails: boolean;
    searchValue: string;

    showNoRecordsFound: boolean;
    addPaymentBsModalRef: BsModalRef;
    paymentDetailsBsModalRef: BsModalRef;

    excelExporterService = inject(ExcelExporterService);
    settingsService = inject(SettingsService);
    accountService = inject(AuthService);
    alertService = inject(AlertService);
    utilsService = inject(UtilsService);
    occupantsService = inject(OccupancyService);
    constructor(
        private billPaymentService: BillPaymentService,
        private paymentService: BsModalService,
        private paymentDetailsService: BsModalService,
        private logger: NGXLogger,
    ) {
        this.accountService.currentUser.subscribe(x => this.currentUser = x);
    }


    ngOnDestroy(): void {
        this.paymentService.hide();
    }

    ngOnInit(): void {
        this.showOccupantDetails = false;
        this.isSearching = false;
        this.startDate = this.utilsService.getFirstDayDate();
        this.endDate = new Date();
        this.searchParameter = "DR";
        this.searchParameterListener();
        this.listOfOccupantProperties = [];
        this.showNoRecordsFound = false;
        this.currentYear = new Date().getFullYear();
    }

    trackByFn(item: OccupantProperty) {
        return item.occupantName;
    }

    searchOccupants() {
        this.showSpinner = true;
        this.selectedOccupant = new OccupantProperty();
        this.showOccupantDetails = false;
        this.showNoRecordsFound = false;

        if (this.searchTerm !== '' || this.searchTerm.length > 3) {
            this.isSearching = true;
            this.searchGetCall(this.searchTerm)
                .pipe(
                    debounceTime(400),
                    distinctUntilChanged()
                )
                .subscribe(
                    (res: OccupantPropertyListResponse) => {
                        this.isSearching = false;
                        this.response = res;
                        this.listOfOccupantProperties = res.occupantProperties;
                        if (res.occupantProperties.length <= 0) {
                            this.showNoRecordsFound = true;
                        }
                    },
                    (err) => {
                        this.isSearching = false;
                        console.error('error', err);
                    }
                );
        }
        this.showSpinner = false;
    }

    searchGetCall(term: string): any {
        return this.occupantsService.quickSearchOccupantProperties(this.currentUser, term, 'ALL').pipe(
            catchError((error) => {
                console.error('Error:', error);
                return throwError(error);
            })
        );
    }

    selectOccupant(occupant: OccupantProperty) {
        this.listOfOccupantProperties = [];
        this.searchTerm = '';
        this.selectedOccupant = occupant;
        this.showOccupantDetails = true;
        this.searchOccupantPayments();
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

    cancelButton(): void {
        this.showOccupantDetails = false
        this.selectedOccupant = new OccupantProperty();
        this.listOfOccupantProperties = [];
        this.listOfPropertyLedgers = [];
    }

    openPaymentComponent(selectedOccupant: OccupantProperty, isAddMode: boolean) {
        if (isAddMode) {
            selectedOccupant = this.selectedOccupant;
        }
        const initialState: ModalOptions = {
            initialState: {
                isAddMode,
                selectedOccupant
            }
        };
        this.paymentService.config.ignoreBackdropClick = true;
        this.paymentService.config.animated = true;
        this.addPaymentBsModalRef = this.paymentService.show(AddPaymentComponent, initialState);
        this.addPaymentBsModalRef.content.closeBtnName = 'Close';
    }

    openPaymentDetailsComponent(propertyLedger: PropertyLedger, selectedOccupant: OccupantProperty) {
       
        const initialState: ModalOptions = {
            initialState: {
                propertyLedger,
                selectedOccupant
            }
        };
        this.paymentDetailsService.config.ignoreBackdropClick = true;
        this.paymentDetailsService.config.animated = true;
        this.paymentDetailsBsModalRef = this.paymentService.show(ViewPaymentDetailsComponent, initialState);
        this.paymentDetailsBsModalRef.content.closeBtnName = 'Close';
    }

    export(): void {
        // let Heading = [ [ 'brandId', 'Contact', 'City', 'Location', 'Digital Address', 'Created By', 'Created Date', 'Last Modified By', 'Last Modified Date' ] ];
        this.excelExporterService.exportAsExcelFile(this.listOfPropertyLedgers, "occupantProperties");
    }


    searchOccupantPayments(): void {

        this.listOfPropertyLedgers = [];
        this.totalCredit = 0;
        this.totalDebit = 0;
        this.currentBal = 0;
        this.balance = 0;


        let request = new PropertyLedgerEntriesRequest();
        request.endDate = this.endDate;
        request.startDate = this.startDate;
        request.occupantId = this.selectedOccupant.occupantId;
        request.propertyId = this.selectedOccupant.propertyId;
        request.searchBy = this.searchParameter;
        request.searchValue = this.searchValue;

        if (this.searchParameter === 'DR') {
            request.searchValue = "DR";
        }

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


