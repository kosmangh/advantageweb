
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { Estate } from 'src/app/@models/settings/estate';
import { EstateBlock } from 'src/app/@models/settings/estate-block';
import { User } from 'src/app/@models/user';
import { EstateBlockListResponse } from 'src/app/@restmodels/settings/estate-block-list.response';
import { EstateListResponse } from 'src/app/@restmodels/settings/estate-list.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { BillPaymentService } from 'src/app/@services/bill-payment.service';
import { OccupancyService } from 'src/app/@services/occupancy.service';
import { SettingsService } from 'src/app/@services/settings.service';
import { UtilsService } from 'src/app/@services/utils.service';
import { AddItemComponent } from 'src/app/@shared/components/add-item.component';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { FullNameComponent } from 'src/app/@shared/components/full-name.component';
import { PageTitleComponent } from 'src/app/@shared/components/page-title.component';
import { ListFilterPipe } from 'src/app/@shared/pipes/list-filter.pipe';
import { RemoveHyphenPipe } from 'src/app/@shared/pipes/remove-hyphen.pipe';
import { TimeAgoPipe } from 'src/app/@shared/pipes/time-ago.pipe';
import Swal from 'sweetalert2';
import { DemandNoticeResponse } from 'src/app/@restmodels/bill-payment/demand-notice.response';
import { DemandNotice } from 'src/app/@models/bill-payment/demand-notice';
import { DemandNoticeRequest } from 'src/app/@restmodels/bill-payment/demand-notice.request';


@Component({
    standalone: true,
    templateUrl: './demand-notice.component.html',
    imports: [ CommonModule, PageTitleComponent, FormLabelComponent, NgSelectModule, TooltipModule,
        FormsModule, CalendarModule, AddItemComponent, TableModule, ListFilterPipe, FullNameComponent,
        RemoveHyphenPipe, TimeAgoPipe ]

})
export class DemandNoticeComponent implements OnInit, OnDestroy {

    currentUser: User;
    searchedKeyword: string;
    bsModalRef?: BsModalRef;
    isAddMode: boolean;
    startDate: Date;
    endDate: Date;

    searchBy: string;
    searchParameterLabel: string;
    searchValue: string;
    estate: string;
    block: string;
    showOccupantSearchBy: boolean = true;
    listOfEstateBlocks: EstateBlock[];
    listOfEstates: Estate[];
    listOfMonths: string[];

    settingsService = inject(SettingsService);
    accountService = inject(AuthService);
    alertService = inject(AlertService);
    utilsService = inject(UtilsService);
    occupantsService = inject(OccupancyService);
    totalArrears: string | number;
    totalCurrentCharge: string | number;
    totalAmountDue: string | number;

    searchParameter: string = "BAB";
    listOfChargeYears: any[];
    chargeYear: number;
    demandNotices: DemandNotice[];
    billType: string;
    billMonth: string;
    request: DemandNoticeRequest;

    constructor(
        private billPaymentService: BillPaymentService,
        private logger: NGXLogger,
    ) {
        this.accountService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit(): void {
        this.searchParameter == "BAB";
        this.chargeYear = this.utilsService.getFirstDayDate().getFullYear();
        this.billMonth = this.utilsService.getCurrentMonthName();
        this.billType = "GROUND_RENT";
        this.estate = "A";
        this.block = "A";
        this.totalArrears = 0.0;
        this.totalCurrentCharge = 0.0;
        this.totalAmountDue = 0.0;
        this.searchParameterListener();
        this.listOfChargeYears = this.utilsService.getChargeYears();
        this.listOfMonths = this.utilsService.getMonthsOfYear();

    }


    ngOnDestroy(): void {
        Swal.close();
    }


    resetList() {
        this.demandNotices = [];
    }
    searchParameterListener(): void {

        if (this.searchParameter == "NAM") {
            this.searchParameterLabel = "Occupant Name";
            return;
        }
        if (this.searchParameter == "MOB") {
            this.searchParameterLabel = "Mobile No.";
            return;
        }
        if (this.searchParameter == "PNAM") {
            this.searchParameterLabel = "Property Name";
            return;
        }
        if (this.searchParameter == "PNO") {
            this.searchParameterLabel = "Property No";
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
        this.request = new DemandNoticeRequest();
        this.request.searchParameter = this.searchParameter;
        this.request.searchValue = this.searchValue;
        this.request.billYear = this.chargeYear;
        this.request.billType = this.billType;
        this.request.billMonth = this.billType === 'GROUND_RENT' ? "" : this.billMonth;

        if (this.searchParameter == "BAB") {
            this.request.searchValue = this.block;
        }
        this.totalArrears = 0.0;
        this.totalCurrentCharge = 0.0;
        this.totalAmountDue = 0.0;
        this.demandNotices = [];
        this.billPaymentService.generateDemandNotice(this.currentUser, this.request).subscribe({
            next: (res: DemandNoticeResponse) => {
                this.logger.info(`generateDemandNotice response ` + JSON.stringify(res));
                if (res.headerResponse.responseCode !== '000') {
                    this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                    return;
                }
                if (res.demandNotices.length <= 0) {
                    this.alertService.showInfoMsgGeneral("No demand notice found");
                    this.logger.info("No demand notice found");
                    return;
                }
                this.demandNotices = res.demandNotices;

                this.totalCurrentCharge = res.totalCurrentCharge;
                this.totalArrears = res.totalArrears;
                this.totalAmountDue = res.totalAmountDue;
            },
            error: error => {
                this.logger.error(error);
                this.alertService.showInfoMsg(error);
            }
        });
    }

    export(): void {
        // let Heading = [ [ 'brandId', 'Contact', 'City', 'Location', 'Digital Address', 'Created By', 'Created Date', 'Last Modified By', 'Last Modified Date' ] ];
        // this.excelExporterService.exportAsExcelFile(this.billPayments, "occupantProperties");
    }

    printDemandNotice(): void {
        this.billPaymentService.generateJasperReport(this.currentUser, this.request);
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






    async logAction(msg: string, ui: string): Promise<void> {
        await this.accountService.logUserAudit(msg, ui);
    }
}
