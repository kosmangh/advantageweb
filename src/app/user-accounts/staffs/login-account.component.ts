import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { CalendarModule } from 'primeng/calendar';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { Region } from 'src/app/@models/settings/region';
import { User } from 'src/app/@models/user';
import { Department } from 'src/app/@models/user-accounts/department';
import { Staff } from 'src/app/@models/user-accounts/staff';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { SettingsService } from 'src/app/@services/settings.service';
import { UserAccountService } from 'src/app/@services/user-account.service';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { RequiredFieldComponent } from 'src/app/@shared/components/required-field.component';
import { RequiredFieldsNoticeComponent } from 'src/app/@shared/components/required-fields-notice.component';
import Swal from 'sweetalert2';
import { FullNameComponent } from "../../@shared/components/full-name.component";
import { UtilsService } from 'src/app/@services/utils.service';
import { CopyButtonComponent } from 'src/app/@shared/components/copy.component';
import { StaffService } from 'src/app/@services/staff.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  standalone: true,
  templateUrl: './login-account.component.html',
  imports: [ CommonModule, ReactiveFormsModule, RequiredFieldsNoticeComponent, FormsModule, CopyButtonComponent,
    FormLabelComponent, RequiredFieldComponent, CalendarModule, NgSelectModule, FullNameComponent, TooltipModule
 ]
})
export class LoginAccountComponent implements OnInit {


  currentUser: User;
  staff: Staff;
  searchedKeyword: string;

  loginAccountFormGroup: FormGroup;

  headerMsg: string;
  isAddMode: boolean;
  individualStaffModalService: BsModalService;
  listOfUserRoles: any[];
  currentStep: number = 1;
  listOfStatus: any;

  submitted = false;


  router = inject(Router);

  settingsService = inject(SettingsService);
  userAccountService = inject(UserAccountService);
  accountService = inject(AuthService);
  alertService = inject(AlertService);
  utilsService = inject(UtilsService);
  staffService = inject(StaffService);
  constructor(
    private title: Title,
    public loginAccountBsModalRef: BsModalRef,
    private fb: FormBuilder,
    private logger: NGXLogger,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.currentStep = 1;

    this.createStaffForm();

    if (this.isAddMode) {
      this.headerMsg = 'Login profile for ' + this.staff.username;
      this.title.setTitle(this.headerMsg);
    } else {
      this.headerMsg = 'Edit login profile for ' + this.staff.username;
      this.title.setTitle(this.headerMsg);
      this.loginAccountFormGroup.patchValue(this.staff);
      this.loginAccountFormGroup.patchValue({
        password: this.utilsService.generatePassword(this.staff.username)
      })
    }
    this.loginAccountFormGroup.patchValue(this.staff);
    this.loginAccountFormGroup.patchValue({
      password: this.utilsService.generatePassword(this.staff.username)
    })
    this.loginAccountBsModalRef.setClass("gray modal-sm modal-dialog-top");
    this.listOfUserRoles = this.settingsService.getUserRoles();
    this.listOfStatus = this.settingsService.getStatus();
  }


  createStaffForm(): void {
    this.loginAccountFormGroup = this.fb.group({
      password: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      userRole: [ '', [ Validators.required ] ],
      status: [ '', [ Validators.required ] ],
      recordId: [ '', ],
    });
  }


  get loginAccountForm() { return this.loginAccountFormGroup.controls; }

  generatePassword() {
    this.loginAccountFormGroup.patchValue({
      password: this.utilsService.generatePassword(this.staff.username)
    })
  }

  saveStaff(): void {
    this.submitted = true;
    if (this.loginAccountFormGroup.invalid) {
      return;
    }
    let firstName = this.staff.fullName;
    Swal.fire({
      title: `Confirmation`,
      text: `Do you want to create account for  ${firstName}?`,
      icon: 'question',
      position: 'top',
      showCancelButton: true,
      confirmButtonText: 'Yes, create',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.value) {
        this.alertService.clear();
        // stop here if userFormGroup is invalid
        if (this.loginAccountFormGroup.invalid) {
          return;
        }

        this.staffService.createLoginAccount (this.currentUser, this.loginAccountFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse): void => {
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${firstName} created successfully`);
              this.loginAccountBsModalRef.hide();
              this.accountService.reloadCurrentRoute();
              this.loginAccountFormGroup.reset();
              this.submitted = false;
              this.logAction(`created login account for  ${firstName}`, PortalMenus.USER_ACCOUNT);
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
    if (this.loginAccountFormGroup.invalid) {
      return;
    }
    let firstName = this.staff.fullName;


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

        // let institutionData = Object.assign(this.loginAccountFormGroup.value, this.loginAccountFormGroup.value);


        this.userAccountService.updateStaff(this.currentUser, this.loginAccountFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('updateStaff response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${firstName} updated successfully`);
              this.loginAccountBsModalRef.hide();
              this.logAction(`Updated ${firstName}`, PortalMenus.USER_ACCOUNT);
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
