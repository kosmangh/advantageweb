import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { Zone } from 'src/app/@models/settings/zone';
import { User } from 'src/app/@models/user';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { SettingsService } from 'src/app/@services/settings.service';
import { RequiredFieldsNoticeComponent } from "../../@shared/components/required-fields-notice.component";
import { FormLabelComponent } from "../../@shared/components/form-label.component";
import { RequiredFieldComponent } from "../../@shared/components/required-field.component";
import { Title } from '@angular/platform-browser';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  templateUrl: './add-zone.component.html',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, RequiredFieldsNoticeComponent,
    FormLabelComponent, RequiredFieldComponent ]
})
export class AddZoneComponent implements OnInit {


  currentUser: User;
  listOfZones: Zone[];
  zone: Zone;
  searchedKeyword: string;
  zoneFormGroup?: FormGroup;
  zoneHeaderMsg: string;
  isAddMode: boolean;
  selectedZone: Zone;
  submitted: boolean = false;


  constructor(
    private title: Title,
    public addZoneBsModalRef: BsModalRef,
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
      this.zoneHeaderMsg = 'New zone';
      this.title.setTitle(this.zoneHeaderMsg);
    } else {
      this.zoneHeaderMsg = 'Edit ' + this.zone.zoneName;
      this.title.setTitle(this.zoneHeaderMsg);
      this.zoneFormGroup.patchValue(this.zone);
    }
    this.addZoneBsModalRef.setClass("gray modal-sm modal-dialog-top");

  }


  createNewForm(): void {

    this.zoneFormGroup = this.fb.group({
      zoneName: [ '', { updateOn: 'blur', validators: [ Validators.required, Validators.minLength(3) ] } ],
      contactNo: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      address: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      remarks: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      recordId: [ '', ],
      saveAndNew: [ false, ]
    });
  }
  get zoneForm() { return this.zoneFormGroup.controls; }

  saveZone(): void {
    this.submitted = true;
    if (this.zoneFormGroup.invalid) {
      return;
    }

    let zoneName = this.zoneForm.zoneName.value;
    Swal.fire({
      title: `Confirmation`,
      text: `Do you want to create zone  ${zoneName}?`,
      icon: 'question',
      position: 'top',
      showCancelButton: true,
      confirmButtonText: 'Yes, create',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.value) {
        this.alertService.clear();

        this.settingsService.saveZone(this.currentUser, this.zoneFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse): void => {
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${zoneName} created successfully`);
              if (!this.zoneForm.saveAndNew.value) {
                this.addZoneBsModalRef.hide();
                this.accountService.reloadCurrentRoute();
              }
              this.zoneFormGroup.reset();
              this.submitted=false;
              this.logAction(`created zone ${zoneName}`, PortalMenus.SETTINGS);
            },
            error: error => {
              this.alertService.showInfoMsg(error);
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  updateZone(): void {
    this.submitted = true;
    if (this.zoneFormGroup.invalid) {
      return;
    }

    let zoneName = this.zoneForm.zoneName.value;

    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `Do you want to update Zone ${zoneName}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, update',
    }).then((result) => {
      if (result.value) {
        // reset alerts on submit
        this.alertService.clear();
       
        this.settingsService.updateZone(this.currentUser, this.zoneFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('updateUserAccount response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${zoneName} updated successfully`);
              this.addZoneBsModalRef.hide();
              this.logAction(`Updated ${zoneName}`, PortalMenus.SETTINGS);
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




  deleteZone(): void {
    let zoneName = this.zoneForm.zoneName.value;
    Swal.fire({
      position: 'top',
      title: `Deletion`,
      text: `Do you want to delete Zone ${zoneName}?`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.value) {
        // reset alerts on submit
        this.alertService.clear();
        // stop here if userFormGroup is invalid
        if (this.zoneFormGroup.invalid) {
          return;
        }
        this.settingsService.deleteZone(this.currentUser, this.zoneForm.recordId.value)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('delete zone response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${zoneName} updated successfully`);
              this.addZoneBsModalRef.hide();
              this.logAction(`delete Zone  ${zoneName}`, PortalMenus.SETTINGS);
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
