import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { User } from 'src/app/@models/user';
import { Staff } from 'src/app/@models/user-accounts/staff';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { SettingsService } from 'src/app/@services/settings.service';
import { StaffService } from 'src/app/@services/staff.service';
import { UserAccountService } from 'src/app/@services/user-account.service';
import { UtilsService } from 'src/app/@services/utils.service';
import Swal from 'sweetalert2';
import { CopyButtonComponent } from 'src/app/@shared/components/copy.component';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { FullNameComponent } from 'src/app/@shared/components/full-name.component';
import { RequiredFieldComponent } from 'src/app/@shared/components/required-field.component';
import { LoginAccountRequest } from 'src/app/@restmodels/user-accounts/login-account.request';

@Component({
  standalone: true,
  templateUrl: './admin-password-reset.component.html',
  imports: [ CommonModule, ReactiveFormsModule, FormsModule, CopyButtonComponent,
    FormLabelComponent, RequiredFieldComponent, FullNameComponent ]
})
export class AdminPasswordResetComponent implements OnInit {


  currentUser: User;
  staff: Staff;

  passwordResetFormGroup: FormGroup;
  individualStaffModalService: BsModalService;
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
    public adminPasswordResetBsModalRef: BsModalRef,
    private fb: FormBuilder,
    private logger: NGXLogger,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.createStaffForm();
    this.title.setTitle("Password reset");
    this.passwordResetFormGroup.patchValue(this.staff);
    this.passwordResetFormGroup.patchValue({
      password: this.utilsService.generatePassword(this.staff.username)
    })
    this.adminPasswordResetBsModalRef.setClass("gray modal-sm modal-dialog-top");
  }


  createStaffForm(): void {
    this.passwordResetFormGroup = this.fb.group({
      password: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      recordId: [ '', ],
    });
  }


  get passwordResetForm() { return this.passwordResetFormGroup.controls; }

  generatePassword() {
    this.passwordResetFormGroup.patchValue({
      password: this.utilsService.generatePassword(this.staff.username)
    })
  }

  resetPassword(): void {
    let staffName = this.staff.fullName;

    let request = new LoginAccountRequest();
    request.createdBy = this.staff.username;
    request.password = this.passwordResetForm.password.value;
    request.status = "RESET";
    request.userRole = this.staff.userRole;
    request.recordId = this.staff.recordId;

    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `Do you want to reset password of ${staffName}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, reset',
    }).then((result) => {
      if (result.value) {
        this.staffService.resetPassword(this.currentUser, request)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('reset password response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(res.headerResponse.responseMessage);
              this.adminPasswordResetBsModalRef.hide();
              this.logAction(`Reset password of ${staffName}`, PortalMenus.USER_ACCOUNT);
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
