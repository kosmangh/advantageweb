import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NGXLogger } from 'ngx-logger';
import { CalendarModule } from 'primeng/calendar';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { Estate } from 'src/app/@models/settings/estate';
import { EstateBlock } from 'src/app/@models/settings/estate-block';
import { EstateProperty } from 'src/app/@models/settings/estate-property';
import { User } from 'src/app/@models/user';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { EstateBlockListResponse } from 'src/app/@restmodels/settings/estate-block-list.response';
import { EstateListResponse } from 'src/app/@restmodels/settings/estate-list.response';
import { EstatePropertyListResponse } from 'src/app/@restmodels/settings/estate-property-list.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { RentalBillService } from 'src/app/@services/rental-bill.service';
import { SettingsService } from 'src/app/@services/settings.service';
import { UtilsService } from 'src/app/@services/utils.service';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { RequiredFieldComponent } from 'src/app/@shared/components/required-field.component';
import { RequiredFieldsNoticeComponent } from 'src/app/@shared/components/required-fields-notice.component';
import Swal from 'sweetalert2';
import { EstateBillingComponent } from '../estate-billing.component';
import { AddItemComponent } from "../../@shared/components/add-item.component";

@Component({
    standalone: true,
    templateUrl: './back-rental-billing.component.html',
    imports: [ CommonModule, FormsModule, ReactiveFormsModule, RequiredFieldsNoticeComponent, CalendarModule,
        FormLabelComponent, RequiredFieldComponent, NgSelectModule, TabsModule, EstateBillingComponent, AddItemComponent ]
})
export class BackRentalBillingComponent implements OnInit {

    currentUser: User;
    listOfChargeYears: number[];
    rentalBillFormGroup?: FormGroup;
    submitted: boolean = false;

    listOfUsages: any[];
    listOfEstates: Estate[];
    listOfBlocks: EstateBlock[];
    listOfProperties: EstateProperty[];
    listOfMonths: string[];

    constructor(
        private rentBillingService: RentalBillService,
        private utilsService: UtilsService,
        private settingsService: SettingsService,
        public addRentalBillBsModalRef: BsModalRef,
        private fb: FormBuilder,
        private accountService: AuthService,
        private alertService: AlertService,
        private logger: NGXLogger,
    ) {
        // gets logged in user details
        this.accountService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit(): void {
        this.fetchEstates();
        this.createNewForm();
        this.listOfChargeYears = this.utilsService.getChargeYears();
        this.listOfMonths = this.utilsService.getMonthsOfYear();
    }

    createNewForm(): void {

        this.rentalBillFormGroup = this.fb.group({
            estateId: [ '', [ Validators.required ] ],
            blockId: [ '', [ Validators.required ] ],
            propertyId: [ '', [ Validators.required ] ],
            rentAmount: [ '', [ Validators.required ] ],
            startYear: [ '', [ Validators.required ] ],
            startMonth: [ '', [ Validators.required ] ],
            endMonth: [ '', [ Validators.required ] ],
            endYear: [ '', [ Validators.required ] ],
            recordId: [ '', ],
            billingType: [ 'PROP' ],
            saveAndNew: [ false, ]
        });

        this.rentalBillForm.startMonth.setValue(this.utilsService.getLastMonthName());
        this.rentalBillForm.startYear.setValue(this.utilsService.getLastDayOfPreviousMonth().getFullYear());

        this.rentalBillForm.endMonth.setValue(this.utilsService.getCurrentMonthName());
        this.rentalBillForm.endYear.setValue(new Date().getFullYear());
    }

    get rentalBillForm() { return this.rentalBillFormGroup.controls; }


    resetRentalBill(): void {
        this.createNewForm();
    }

    applyBackRentalBill(): void {
        this.submitted = true;
        if (this.rentalBillFormGroup.invalid) {
            return;
        }

        let propertyName = this.listOfProperties.find(option => option.recordId === this.rentalBillForm.propertyId.value)?.propertyName;
        Swal.fire({
            title: `Confirmation`,
            text: `Do you want to apply ground rent bill for  ${propertyName} property?`,
            icon: 'question',
            position: 'top',
            showCancelButton: true,
            confirmButtonText: 'Yes, create',
            cancelButtonText: 'No, cancel'
        }).then((result) => {
            if (result.value) {
                this.alertService.clear();
                this.rentBillingService.applyBackRentalBill(this.currentUser, this.rentalBillFormGroup.value)
                    .subscribe({
                        next: (res: GeneralResponse): void => {
                            if (res.headerResponse.responseCode !== '000') {
                                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                                return;
                            }
                            this.alertService.showSuccessMsg(res.headerResponse.responseMessage);
                            // if (!this.rentalBillForm.saveAndNew.value) {
                            //     this.addRentalBillBsModalRef.hide();
                            //     this.accountService.reloadCurrentRoute();
                            // }
                            // this.rentalBillFormGroup.reset();
                            // this.createNewForm();
                            this.submitted = false;
                            this.logAction(`Applied ground rent bill for ${propertyName}`, PortalMenus.ESTATE_BILLING);
                        },
                        error: error => {
                            this.alertService.showInfoMsg(error);
                        }
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
        });
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

    fetchBlocks(): void {
        this.listOfBlocks = [];
        this.settingsService.getEstateBlocks(this.currentUser, this.rentalBillForm.estateId.value).subscribe({
            next: (res: EstateBlockListResponse) => {
                this.logger.info(`getEstateBlocks response ` + JSON.stringify(res))
                if (res.headerResponse.responseCode !== '000') {
                    this.alertService.error(res.headerResponse.responseMessage);
                    return;
                }
                if (res.estateBlocks.length <= 0) {
                    this.alertService.showInfoMsgGeneral("No blocks found");
                    this.logger.info("No blocks found");
                    return;
                }
                this.listOfBlocks = res.estateBlocks;
            },
            error: error => {
                this.logger.error(error);
                this.alertService.showInfoMsg(error);
            }
        });
    }


    fetchEstateProperties(): void {
        this.listOfProperties = [];
        this.settingsService.getEstateProperties(this.currentUser, this.rentalBillForm.blockId.value,true,"RENTAL").subscribe({
            next: (res: EstatePropertyListResponse) => {
                this.logger.info(`getEstateProperties response ` + JSON.stringify(res))
                if (res.headerResponse.responseCode !== '000') {
                    this.alertService.error(res.headerResponse.responseMessage);
                    return;
                }
                if (res.properties.length <= 0) {
                    this.alertService.showInfoMsgGeneral("No properties found");
                    this.logger.info("No properties found ");
                    this.rentalBillForm.propertyId.setValue("No properties found");
                    return;
                }
                this.listOfProperties = res.properties;
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