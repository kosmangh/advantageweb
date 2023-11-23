import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { Region } from 'src/app/@models/settings/region';
import { User } from 'src/app/@models/user';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { SettingsService } from 'src/app/@services/settings.service';
import Swal from 'sweetalert2';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { RequiredFieldComponent } from 'src/app/@shared/components/required-field.component';
import { RequiredFieldsNoticeComponent } from 'src/app/@shared/components/required-fields-notice.component';
import { ZoneListResponse } from 'src/app/@restmodels/settings/zone-list.response';
import { Zone } from 'src/app/@models/settings/zone';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule,
    RequiredFieldsNoticeComponent, FormLabelComponent, RequiredFieldComponent ],
  templateUrl: './add-region.component.html'
})
export class AddRegionComponent implements OnInit {


  currentUser: User;
  listOfRegions: Region[];
  listOfZones: Zone[];
  listGhanaRegions: any[];
  region: Region;
  searchedKeyword: string;
  regionFormGroup?: FormGroup;
  regionHeaderMsg: string;
  isAddMode: boolean;
  selectedRegion: Region;
  submitted: boolean=false;


  constructor(
    private title: Title,
    public addRegionBsModalRef: BsModalRef,
    private fb: FormBuilder,
    private accountService: AuthService,
    private alertService: AlertService,
    private logger: NGXLogger,
    private settingsService: SettingsService,
  ) {
    // gets logged in user details
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }



  ngOnInit(): void {

    this.createNewForm();
    if (this.isAddMode) {
      this.regionHeaderMsg = 'New region';
      this.title.setTitle(this.regionHeaderMsg);
    } else {
      this.regionHeaderMsg = 'Edit ' + this.region.regionName;
      this.title.setTitle(this.regionHeaderMsg);
      this.regionFormGroup.patchValue(this.region);
    }
    this.addRegionBsModalRef.setClass("gray modal-sm modal-dialog-top");
    this.fetchZones();
    this.listGhanaRegions = this.settingsService.getGhanaRegions();
  }


  createNewForm(): void {

    this.regionFormGroup = this.fb.group({
      regionName: [ '', { updateOn: 'blur', validators: [ Validators.required, Validators.minLength(3) ] } ],
      zoneId: [ '', [ Validators.required ] ],
      recordId: [ '', ],
      saveAndNew: [ false, ]
    });
  }
  get regionForm() { return this.regionFormGroup.controls; }

  fetchZones(): void {
    this.listOfZones = [];
    this.settingsService.getZones().subscribe({
      next: (res: ZoneListResponse) => {
        this.logger.info(`getZones response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.zones.length <= 0) {
          this.alertService.showInfoMsgGeneral("No zones found");
          this.logger.info("No zones found");
          return;
        }
        this.listOfZones = res.zones;
      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }

  saveRegion(): void {
    this.submitted = true;
    this.alertService.clear();
    // stop here if userFormGroup is invalid
    if (this.regionFormGroup.invalid) {
      return;
    }
    let regionName = this.regionForm.regionName.value;
    Swal.fire({
      title: `Confirmation`,
      text: `Do you want to create region  ${regionName}?`,
      icon: 'question',
      position: 'top',
      showCancelButton: true,
      confirmButtonText: 'Yes, create',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.value) {
        
        this.settingsService.createRegion(this.currentUser, this.regionFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse): void => {
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${regionName} created successfully`);
              if (!this.regionForm.saveAndNew.value) {
                this.addRegionBsModalRef.hide();
                setTimeout(() => window.location.reload(), 1500);
              }
              this.submitted = false;
              this.regionFormGroup.reset();
              this.logAction(`created region ${regionName}`, PortalMenus.SETTINGS);
            },
            error: error => {
              this.alertService.showInfoMsg(error);
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  updateRegion(): void {
    this.submitted = true;
    this.alertService.clear();
    // stop here if userFormGroup is invalid
    if (this.regionFormGroup.invalid) {
      return;
    }
    let regionName = this.regionForm.regionName.value;

    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `Do you want to update Region ${regionName}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, update',
    }).then((result) => {
      if (result.value) {
        // reset alerts on submit
        this.alertService.clear();
        // stop here if userFormGroup is invalid
        if (this.regionFormGroup.invalid) {
          return;
        }
        this.settingsService.updateRegion(this.currentUser, this.regionFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('updateUserAccount response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${regionName} updated successfully`);
              this.addRegionBsModalRef.hide();
              this.logAction(`Updated ${regionName}`, PortalMenus.SETTINGS);
              setTimeout(() => window.location.reload(), 1500);
            },
            error: error => {
              this.alertService.showInfoMsg(error.message);
            }
          });

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });
  }

  deleteRegion() {
    this.submitted = true;
    this.alertService.clear();
    if (this.regionFormGroup.invalid) {
      return;
    }
  }


  



  async logAction(msg: string, ui: string): Promise<void> {
    await this.accountService.logUserAudit(msg, ui);
  }
}
