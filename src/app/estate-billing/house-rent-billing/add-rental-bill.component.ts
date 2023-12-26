import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { Estate } from 'src/app/@models/settings/estate';
import { EstateBlock } from 'src/app/@models/settings/estate-block';
import { User } from 'src/app/@models/user';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { EstateBlockListResponse } from 'src/app/@restmodels/settings/estate-block-list.response';
import { EstateListResponse } from 'src/app/@restmodels/settings/estate-list.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { SettingsService } from 'src/app/@services/settings.service';
import { UtilsService } from 'src/app/@services/utils.service';
import Swal from 'sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { RequiredFieldComponent } from 'src/app/@shared/components/required-field.component';
import { RequiredFieldsNoticeComponent } from 'src/app/@shared/components/required-fields-notice.component';
import { EstateProperty } from 'src/app/@models/settings/estate-property';
import { EstatePropertyListResponse } from 'src/app/@restmodels/settings/estate-property-list.response';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { EstateBillingComponent } from '../estate-billing.component';
import { CalendarModule } from 'primeng/calendar';
import { RentalBillService } from 'src/app/@services/rental-bill.service';

@Component({
  selector: 'app-add-rental-bill',
  standalone: true,
  templateUrl: './add-rental-bill.component.html',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, RequiredFieldsNoticeComponent, CalendarModule,
    FormLabelComponent, RequiredFieldComponent, NgSelectModule, TabsModule, EstateBillingComponent ]
})
export class AddRentalBillComponent implements OnInit {

  currentUser: User;
  listOfChargeYears: number[];
  rentalBillFormGroup?: FormGroup;
  submitted: boolean = false;

  listOfUsages: any[];
  listOfEstates: Estate[];
  listOfBlocks: EstateBlock[];
  listOfProperties: EstateProperty[];


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
    this.createNewForm();
    this.addRentalBillBsModalRef.setClass("gray modal-md modal-dialog-top");
    this.listOfChargeYears = this.utilsService.getChargeYears();
    this.listOfUsages = this.settingsService.getPropertyUsage();
  }


  createNewForm(): void {

    this.rentalBillFormGroup = this.fb.group({
      estateId: [ '', [ Validators.required ] ],
      blockId: [ '', [ Validators.required ] ],
      propertyId: [ '', [ Validators.required ] ],
      rentAmount: [ '', [ Validators.required ] ],
      billDate: [ '', [ Validators.required ] ],
      recordId: [ '', ],
      billingType: [ 'PROP' ],
      saveAndNew: [ false, ]
    });
    this.fetchEstates();

  }
  get rentalBillForm() { return this.rentalBillFormGroup.controls; }

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
    this.settingsService.getEstateProperties(this.currentUser, this.rentalBillForm.blockId.value, true, "RENTAL").subscribe({
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


  savePropertyCharge(): void {
    this.submitted = true;
    if (this.rentalBillFormGroup.invalid) {
      return;
    }

    let property = this.rentalBillForm.propertyId.value;
    let propertyUsageName = this.listOfProperties.find(option => option.recordId === property)?.propertyName;

    Swal.fire({
      title: `Confirmation`,
      text: `Do you want to apply ground rent bill for  ${propertyUsageName} property?`,
      icon: 'question',
      position: 'top',
      showCancelButton: true,
      confirmButtonText: 'Yes, create',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.value) {
        this.alertService.clear();

        this.rentBillingService.saveRentalBill(this.currentUser, this.rentalBillFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse): void => {
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(res.headerResponse.responseMessage);
              if (!this.rentalBillForm.saveAndNew.value) {
                this.addRentalBillBsModalRef.hide();
                this.accountService.reloadCurrentRoute();
              }
              this.rentalBillFormGroup.reset();
              this.createNewForm();
              this.submitted = false;
              this.logAction(`Applied ground rent bill for ${propertyUsageName}`, PortalMenus.ESTATE_BILLING);
            },
            error: error => {
              this.alertService.showInfoMsg(error);
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  async logAction(msg: string, ui: string): Promise<void> {
    await this.accountService.logUserAudit(msg, ui);
  }
}
