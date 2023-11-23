import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
import { UserAccountService } from 'src/app/@services/user-account.service';
import { Staff } from 'src/app/@models/user-accounts/staff';
import { NgSelectModule } from '@ng-select/ng-select';
import { Region } from 'src/app/@models/settings/region';
import { RegionListResponse } from 'src/app/@restmodels/settings/region-list.response';
import { Department } from 'src/app/@models/user-accounts/department';
import { DepartmentListResponse } from 'src/app/@restmodels/user-accounts/department-list.response';

@Component({
  standalone: true,
  templateUrl: './add-staff.component.html',
  imports: [ CommonModule, ReactiveFormsModule, RequiredFieldsNoticeComponent, FormsModule,
    FormLabelComponent, RequiredFieldComponent, CalendarModule, NgSelectModule ]
})
export class AddStaffComponent implements OnInit {


  currentUser: User;
  staff: Staff;
  searchedKeyword: string;

  staffFormGroup: FormGroup;

  headerMsg: string;
  isAddMode: boolean;
  individualStaffModalService: BsModalService;
  listOfGenders: any[];
  listOfUserRoles: any[];
  currentStep: number = 1;
  listOfStatus: any;

  submitted = false;

  settingsService = inject(SettingsService);
  userAccountService = inject(UserAccountService);
  router = inject(Router);
  listOfRegions: Region[];
  listOfDepartments: Department[];


  constructor(
    private title: Title,
    public addStaffBsModalRef: BsModalRef,
    private fb: FormBuilder,
    private accountService: AuthService,
    private alertService: AlertService,
    private logger: NGXLogger,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.currentStep = 1;

    this.createStaffForm();

    if (this.isAddMode) {
      this.headerMsg = 'New staff';
      this.title.setTitle(this.headerMsg);
    } else {
      this.headerMsg = 'Edit ' + this.staff.fullName;
      this.title.setTitle(this.headerMsg);
      this.staffFormGroup.patchValue(this.staff);
      if (this.staff.dob) {
        let cleanedDate = this.staff.dob.toString().replace("[UTC]", "");
        this.staffForm.dob.setValue(new Date(cleanedDate));
      }
    }
    this.addStaffBsModalRef.setClass("gray modal-lg modal-dialog-top");
    this.listOfGenders = this.settingsService.getGender();
    this.listOfUserRoles = this.settingsService.getUserRoles();
    this.listOfStatus = this.settingsService.getStatus();
    this.fetchRegions();
    this.fetchDepartments();
  }


  createStaffForm(): void {
    this.staffFormGroup = this.fb.group({
      firstName: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      lastName: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      gender: [ '', [ Validators.required ] ],
      mobileNo: [ '', { updateOn: 'blur', validators: [ Validators.required, Validators.minLength(10)] } ],
      email: [ '', { updateOn: 'blur', validators: [ Validators.required, Validators.email ] } ],
      address: [ '', { updateOn: 'blur', validators: [ Validators.required, ] } ],
      dob: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      regionId: [ '', [ Validators.required ] ],
      departmentId: [ '', [ Validators.required ] ],
      officeContactNo: [ '', [ Validators.required, Validators.minLength(10) ] ],
      saveAndNew: [ false],
      recordId: [ '', ],
    });
  }


  

  get staffForm() { return this.staffFormGroup.controls; }

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

  fetchDepartments(): void {
    this.listOfDepartments = [];
    this.userAccountService.getDepartments() .subscribe({
      next: (res: DepartmentListResponse) => {
        this.logger.info(`getDepartments response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.departments.length <= 0) {
          this.alertService.showInfoMsgGeneral("No departments found");
          this.logger.info("No departments found");
          return;
        }
        this.listOfDepartments = res.departments;
      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }



  saveStaff(): void {
    this.submitted = true;
    if (this.staffFormGroup.invalid) {
      return;
    }
    let firstName = this.staffForm.firstName.value;
    Swal.fire({
      title: `Confirmation`,
      text: `Do you want to create occupant  ${firstName}?`,
      icon: 'question',
      position: 'top',
      showCancelButton: true,
      confirmButtonText: 'Yes, create',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.value) {
        this.alertService.clear();
        // stop here if userFormGroup is invalid
        if (this.staffFormGroup.invalid) {
          return;
        }

       
        this.userAccountService.createStaff(this.currentUser, this.staffFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse): void => {
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${firstName} created successfully`);
              if (!this.staffForm.saveAndNew.value) {
                this.addStaffBsModalRef.hide();
                this.accountService.reloadCurrentRoute();
              }
              this.staffFormGroup.reset();
              this.submitted = false;
              this.logAction(`created institution occupant ${firstName}`, PortalMenus.OCCUPANCY);
            },
            error: error => {
              this.alertService.showInfoMsg(error.message);
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }


  updateStaff(): void {
    this.submitted = true;
    if (this.staffFormGroup.invalid) {
      return;
    }
    let firstName = this.staffForm.firstName.value;

    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `Do you want to update ${firstName}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, update',
    }).then((result) => {
      if (result.value) {

        // let institutionData = Object.assign(this.staffFormGroup.value, this.staffFormGroup.value);


        this.userAccountService.updateStaff(this.currentUser, this.staffFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('updateStaff response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${firstName} updated successfully`);
              this.addStaffBsModalRef.hide();
              this.logAction(`Updated ${firstName}`, PortalMenus.OCCUPANCY);
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
