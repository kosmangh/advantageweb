import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { CalendarModule } from 'primeng/calendar';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { User } from 'src/app/@models/user';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { SettingsService } from 'src/app/@services/settings.service';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { RequiredFieldComponent } from 'src/app/@shared/components/required-field.component';
import { RequiredFieldsNoticeComponent } from 'src/app/@shared/components/required-fields-notice.component';
import Swal from 'sweetalert2';
import { Estate } from 'src/app/@models/settings/estate';
import { EstateBlock } from 'src/app/@models/settings/estate-block';
import { EstateProperty } from 'src/app/@models/settings/estate-property';
import { EstateBlockListResponse } from 'src/app/@restmodels/settings/estate-block-list.response';
import { EstateListResponse } from 'src/app/@restmodels/settings/estate-list.response';

@Component({
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule, CalendarModule,
    RequiredFieldsNoticeComponent, FormLabelComponent, RequiredFieldComponent ],
  templateUrl: './add-estate-property.component.html'
})
export class AddEstatePropertyComponent implements OnInit {


  currentUser: User;
  listOfEstates: Estate[];
  listOfBlocks: EstateBlock[];
  estateProperty: EstateProperty;
  searchedKeyword: string;
  propertyFormGroup?: FormGroup;
  estateHeaderMsg: string;
  isAddMode: boolean;
  estateModalService: BsModalService;
  listOfCategories: any[];
  listOfUsages: any[];
  submitted = false;

  constructor(
    private title: Title,
    public addEstateBsModalRef: BsModalRef,
    private fb: FormBuilder,
    private accountService: AuthService,
    private alertService: AlertService,
    private logger: NGXLogger,
    private settingsService: SettingsService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }



  ngOnInit(): void {
    this.submitted = false;

    this.createNewForm();
    if (this.isAddMode) {
      this.estateHeaderMsg = 'New estate property';
      this.title.setTitle(this.estateHeaderMsg);
    } else {
      this.estateHeaderMsg = 'Edit ' + this.estateProperty.propertyName;
      this.title.setTitle(this.estateHeaderMsg);
      this.propertyFormGroup.patchValue(this.estateProperty);
    }
    this.listOfCategories = this.settingsService.getPropertyCategories();
    this.listOfUsages = this.settingsService.getPropertyUsage();
    this.addEstateBsModalRef.setClass("gray modal-md modal-dialog-top");
    this.fetchEstates();
    this.fetchBlocks();
  }


  createNewForm(): void {
    this.propertyFormGroup = this.fb.group({
      estateId: [ '', [ Validators.required ] ],
      blockId: [ '', [ Validators.required ] ],
      propertyNo: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      propertyName: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      propertySize: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      usage: [ '', [ Validators.required ] ],
      category: [ '', [ Validators.required ] ],
      description: [ '', '' ],
      recordId: [ '', ],
      saveAndNew: [ false, ]
    });
  }
  get propertyForm() { return this.propertyFormGroup.controls; }

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
    this.settingsService.getEstateBlocks(this.currentUser, this.propertyForm.estateId.value).subscribe({
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


  saveBlock(): void {
    this.alertService.clear();
    this.submitted = true;
    if (!this.propertyFormGroup.valid) {
      return;
    }
    let blockId = this.propertyForm.propertyName.value;
    Swal.fire({
      title: `Confirmation`,
      text: `Do you want to save property  ${blockId}?`,
      icon: 'question',
      position: 'top',
      showCancelButton: true,
      confirmButtonText: 'Yes, create',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.value) {
        this.alertService.clear();
        // stop here if userFormGroup is invalid
        if (this.propertyFormGroup.invalid) {
          return;
        }
        this.settingsService.createEstateProperty(this.currentUser, this.propertyFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse): void => {
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${blockId} created successfully`);
              if (!this.propertyForm.saveAndNew.value) {
                this.addEstateBsModalRef.hide();
                this.accountService.reloadCurrentRoute();
              }
              this.propertyFormGroup.reset();
              this.submitted = false;
              this.logAction(`created estateId ${blockId}`, PortalMenus.SETTINGS);
            },
            error: error => {
              this.alertService.showInfoMsg(error);
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  updateBlock(): void {
    this.alertService.clear();
    this.submitted = true;
    if (!this.propertyFormGroup.valid) {
      return;
    }
    let blockId = this.propertyForm.propertyName.value;

    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `Do you want to update property ${blockId}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, update',
    }).then((result) => {
      if (result.value) {
        // reset alerts on submit
        this.alertService.clear();
        // stop here if userFormGroup is invalid
        if (this.propertyFormGroup.invalid) {
          return;
        }
        this.settingsService.updateEstateProperty(this.currentUser, this.propertyFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('updateEstateProperty response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${blockId} updated successfully`);
              this.addEstateBsModalRef.hide();

              localStorage.setItem('estate', this.propertyFormGroup.value.estateId);
              localStorage.setItem('estateBlock', this.propertyFormGroup.value.blockId);

              this.logAction(`Updated ${blockId}`, PortalMenus.SETTINGS);
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

  
  deleteBlock(): void {
    this.alertService.clear();
    this.submitted = true;
    if (!this.propertyFormGroup.valid) {
      return;
    }
    let blockId = this.propertyForm.propertyName.value;
    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `Do you want to delete property ${blockId}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.value) {
        this.alertService.clear();
        if (this.propertyFormGroup.invalid) {
          return;
        }
        this.settingsService.updateEstateProperty(this.currentUser, this.propertyForm.estateId.value)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('delete blockId response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${blockId} deleted successfully`);
              this.addEstateBsModalRef.hide();
              this.logAction(`Deleted ${blockId}`, PortalMenus.SETTINGS);
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





  async logAction(msg: string, ui: string): Promise<void> {
    await this.accountService.logUserAudit(msg, ui);
  }
}
