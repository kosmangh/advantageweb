import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { Estate } from 'src/app/@models/settings/estate';
import { User } from 'src/app/@models/user';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { SettingsService } from 'src/app/@services/settings.service';
import Swal from 'sweetalert2';
import { RequiredFieldsNoticeComponent } from "../../@shared/components/required-fields-notice.component";
import { FormLabelComponent } from "../../@shared/components/form-label.component";
import { NgSelectModule } from '@ng-select/ng-select';
import { RequiredFieldComponent } from 'src/app/@shared/components/required-field.component';
import { CalendarModule } from 'primeng/calendar';
import { Router } from '@angular/router';
import { EstateService } from 'src/app/@services/estate.service';
import { Region } from 'src/app/@models/settings/region';
import { RegionListResponse } from 'src/app/@restmodels/settings/region-list.response';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  standalone: true,
  templateUrl: './add-estate.component.html',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule, CalendarModule,
    RequiredFieldsNoticeComponent, FormLabelComponent, RequiredFieldComponent, TooltipModule ]
})
export class AddEstateComponent implements OnInit {


  currentUser: User;
  listOfEstates: Estate[];
  listOfRegions: Region[];
  estate: Estate;
  searchedKeyword: string;
  estateFormGroup?: FormGroup;
  estateHeaderMsg: string;
  isAddMode: boolean;
  selectedEstate: Estate;
  listOfEstateClasses: any[];
  estateModalService: BsModalService;
  submitted = false;



  router = inject(Router);
  date13: Date;

  constructor(
    private title: Title,
    public addEstateBsModalRef: BsModalRef,
    private fb: FormBuilder,
    private accountService: AuthService,
    private alertService: AlertService,
    private logger: NGXLogger,
    private settingsService: SettingsService,
    private estateService: EstateService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }



  ngOnInit(): void {

    this.createNewForm();
    if (this.isAddMode) {
      this.estateHeaderMsg = 'New estate';
      this.title.setTitle(this.estateHeaderMsg);
    } else {
      this.estateHeaderMsg = 'Edit ' + this.estate.estateName;
      this.title.setTitle(this.estateHeaderMsg);
      this.estateFormGroup.patchValue(this.estate);

      if (this.estate.leaseStartDate) {
        let cleanedDate = this.estate.leaseStartDate.toString().replace("[UTC]", "");
        this.estateForm.leaseStartDate.setValue(new Date(cleanedDate));
      }
      if (this.estate.leaseEndDate) {
        let cleanedDate = this.estate.leaseEndDate.toString().replace("[UTC]", "");
        this.estateForm.leaseEndDate.setValue(new Date(cleanedDate));
      }
    }
    this.addEstateBsModalRef.setClass("gray modal-md modal-dialog-top");
    this.fetchRegions();
    this.listOfEstateClasses = this.settingsService.getEstateClass();
  }


  createNewForm(): void {

    this.estateFormGroup = this.fb.group({
      estateName: [ '', { updateOn: 'blur', validators: [ Validators.required, Validators.minLength(3) ] } ],
      recordId: [ '', { updateOn: 'blur', validators: [ Validators.required, Validators.minLength(2) ] } ],
      landSize: [ '', { updateOn: 'blur', validators: [ Validators.required, Validators.minLength(3) ] } ],
      estateClass: [ '', [ Validators.required ] ],
      estateLocation: [ '', { updateOn: 'blur', validators: [ Validators.required, Validators.minLength(3) ] } ],
      leaseStartDate: [ '', [ Validators.required ] ],
      leaseEndDate: [ '', [ Validators.required ] ],
      regionId: [ '', [ Validators.required ] ],
      additionalInfo: [ '', '' ],
      saveAndNew: [ false, ]
    });
  }
  get estateForm() { return this.estateFormGroup.controls; }

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

  saveEstate(): void {
    this.alertService.clear();
    this.submitted = true;
    if (!this.estateFormGroup.valid) {
      return;
    }
    let estateName = this.estateForm.estateName.value;
    Swal.fire({
      title: `Confirmation`,
      text: `Do you want to create estate  ${estateName}?`,
      icon: 'question',
      position: 'top',
      showCancelButton: true,
      confirmButtonText: 'Yes, create',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.value) {
        this.alertService.clear();
        // stop here if userFormGroup is invalid
        if (this.estateFormGroup.invalid) {
          return;
        }
        this.estateService.createEstate(this.currentUser, this.estateFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse): void => {
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${estateName} created successfully`);
              if (!this.estateForm.saveAndNew.value) {
                this.addEstateBsModalRef.hide();
                this.accountService.reloadCurrentRoute();
              }
              this.estateFormGroup.reset();
              this.submitted = false;
              this.logAction(`created estate ${estateName}`, PortalMenus.SETTINGS);
            },
            error: error => {
              this.alertService.showInfoMsg(error);
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  updateEstate(): void {
    this.alertService.clear();
    this.submitted = true;
    if (!this.estateFormGroup.valid) {
      return;
    }
    let estateName = this.estateForm.estateName.value;

    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `Do you want to update Estate ${estateName}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, update',
    }).then((result) => {
      if (result.value) {
        // reset alerts on submit
        this.alertService.clear();
        // stop here if userFormGroup is invalid
        if (this.estateFormGroup.invalid) {
          return;
        }
        this.estateService.updateEstate(this.currentUser, this.estateFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('updateUserAccount response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${estateName} updated successfully`);
              this.addEstateBsModalRef.hide();
              this.logAction(`Updated ${estateName}`, PortalMenus.SETTINGS);
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

  deleteEstate() {
    throw new Error('Method not implemented.');

  }


  async reloadCurrentRoute() {
    let currentUrl = this.router.url;
    alert("Current route reload " + currentUrl);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([ currentUrl ]);
    });
  }


  async logAction(msg: string, ui: string): Promise<void> {
    await this.accountService.logUserAudit(msg, ui);
  }
}
