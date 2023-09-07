import { UtilsService } from '../../@services/utils.service';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { User } from 'src/app/@models/user';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { RequiredFieldComponent } from 'src/app/@shared/components/required-field.component';
import { RequiredFieldsNoticeComponent } from 'src/app/@shared/components/required-fields-notice.component';
import Swal from 'sweetalert2';
import { PropertyCharge } from 'src/app/@models/estate-billing/property-charge';
import { PropertyChargeService } from 'src/app/@services/property-charge.service ';
import { Region } from 'src/app/@models/settings/region';
import { RegionListResponse } from 'src/app/@restmodels/settings/region-list.response';
import { SettingsService } from 'src/app/@services/settings.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-add-property-charge',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, RequiredFieldsNoticeComponent,
    FormLabelComponent, RequiredFieldComponent, NgSelectModule ],
  templateUrl: './add-property-charge.component.html'
})
export class AddPropertyChargeComponent implements OnInit {


  currentUser: User;
  listOfPropertyCharges: PropertyCharge[];
  listOfChargeYears: number[];
  propertyCharge: PropertyCharge;
  searchedKeyword: string;
  propertyChargeFormGroup?: FormGroup;
  propertyChargeHeaderMsg: string;
  isAddMode: boolean;
  selectedPropertyCharge: PropertyCharge;
  submitted: boolean = false;
  listOfRegions: Region[];
  listOfUsages: any[];




  constructor(
    private propertyChargeService: PropertyChargeService,
    private utilsService: UtilsService,
    private settingsService: SettingsService,
    private title: Title,
    public addPropertyChargeBsModalRef: BsModalRef,
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
    if (this.isAddMode) {
      this.propertyChargeHeaderMsg = 'New property charge';
      this.title.setTitle(this.propertyChargeHeaderMsg);
      this.propertyChargeFormGroup.patchValue({ chargeYear: new Date().getFullYear() });
    } else {
      this.propertyChargeHeaderMsg = 'Edit property charge';
      this.title.setTitle(this.propertyChargeHeaderMsg);
      this.propertyChargeFormGroup.patchValue(this.propertyCharge);
    }
    this.addPropertyChargeBsModalRef.setClass("gray modal-md modal-dialog-top");
    this.listOfChargeYears = this.utilsService.getChargeYears();
    this.listOfUsages = this.settingsService.getPropertyUsage();
    this.fetchRegions();
  }


  createNewForm(): void {

    this.propertyChargeFormGroup = this.fb.group({
      regionId: [ '', [ Validators.required ] ],
      chargeYear: [ '', [ Validators.required ] ],
      propertyUsage: [ '', [ Validators.required ] ],
      firstClassCharge: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      secondClassCharge: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      thirdClassCharge: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      recordId: [ '', ],
      saveAndNew: [ false, ]
    });
  }
  get propertyChargeForm() { return this.propertyChargeFormGroup.controls; }


  fetchRegions(): void {
    this.listOfRegions = [];
    this.settingsService.getRegions().subscribe({
      next: (res: RegionListResponse) => {
        this.logger.info(`getRegions response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.regions.length <= 0) {
          this.alertService.showInfoMsgGeneral("No regions found");
          this.logger.info("No regions found");
          return;
        }
        this.listOfRegions = res.regions;
      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }

  savePropertyCharge(): void {
    this.submitted = true;
    if (this.propertyChargeFormGroup.invalid) {
      return;
    }

    let propertyUsageName = this.propertyChargeForm.propertyUsage.value;
    Swal.fire({
      title: `Confirmation`,
      text: `Do you want to save property charge  ${propertyUsageName}?`,
      icon: 'question',
      position: 'top',
      showCancelButton: true,
      confirmButtonText: 'Yes, create',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.value) {
        this.alertService.clear();

        this.propertyChargeService.createPropertyCharge(this.currentUser, this.propertyChargeFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse): void => {
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(res.headerResponse.responseMessage);
              if (!this.propertyChargeForm.saveAndNew.value) {
                this.addPropertyChargeBsModalRef.hide();
                this.accountService.reloadCurrentRoute();
              }
              this.propertyChargeFormGroup.reset();
              this.submitted = false;
              this.logAction(`created PropertyCharge ${propertyUsageName}`, PortalMenus.SETTINGS);
            },
            error: error => {
              this.alertService.showInfoMsg(error);
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  updatePropertyCharge(): void {
    this.submitted = true;
    if (this.propertyChargeFormGroup.invalid) {
      return;
    }

    let propertyUsageName = this.propertyChargeForm.propertyUsage.value;
    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `Do you want to update PropertyCharge ${propertyUsageName}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, update',
    }).then((result) => {
      if (result.value) {
        // reset alerts on submit
        this.alertService.clear();

        this.propertyChargeService.updatePropertyCharge(this.currentUser, this.propertyChargeFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('updateUserAccount response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(res.headerResponse.responseMessage);
              this.addPropertyChargeBsModalRef.hide();
              this.logAction(`Updated ${propertyUsageName}`, PortalMenus.SETTINGS);
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




  deletePropertyCharge(): void {
    let PropertyChargeName = this.propertyChargeForm.PropertyChargeName.value;
    Swal.fire({
      position: 'top',
      title: `Deletion`,
      text: `Do you want to delete PropertyCharge ${PropertyChargeName}?`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.value) {
        // reset alerts on submit
        this.alertService.clear();
        // stop here if userFormGroup is invalid
        if (this.propertyChargeFormGroup.invalid) {
          return;
        }
        this.propertyChargeService.deletePropertyCharge(this.currentUser, this.propertyChargeForm.recordId.value)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('delete PropertyCharge response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(res.headerResponse.responseMessage);
              this.addPropertyChargeBsModalRef.hide();
              this.logAction(`delete PropertyCharge  ${PropertyChargeName}`, PortalMenus.SETTINGS);
              this.accountService.reloadCurrentRoute();
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
