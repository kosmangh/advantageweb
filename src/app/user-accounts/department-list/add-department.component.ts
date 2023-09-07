import { UserAccountService } from 'src/app/@services/user-account.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
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
import { Department } from 'src/app/@models/user-accounts/department';

@Component({
  selector: 'app-add-department',
  standalone: true,
  templateUrl: './add-department.component.html',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, RequiredFieldsNoticeComponent,
    FormLabelComponent, RequiredFieldComponent ]
})
export class AddDepartmentComponent implements OnInit {


  currentUser: User;
  listOfDepartments: Department[];
  department: Department;
  searchedKeyword: string;
  departmentFormGroup?: FormGroup;
  departmentHeaderMsg: string;
  isAddMode: boolean;
  selectedDepartment: Department;
  submitted: boolean = false;


  private userAccountService = inject(UserAccountService);

  constructor(
    private title: Title,
    public addDepartmentBsModalRef: BsModalRef,
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
      this.departmentHeaderMsg = 'New department';
      this.title.setTitle(this.departmentHeaderMsg);
    } else {
      this.departmentHeaderMsg = 'Edit ' + this.department.departmentName;
      this.title.setTitle(this.departmentHeaderMsg);
      this.departmentFormGroup.patchValue(this.department);
    }
    this.addDepartmentBsModalRef.setClass("gray modal-sm modal-dialog-top");

  }


  createNewForm(): void {
    this.departmentFormGroup = this.fb.group({
    departmentName: ['', { updateOn: 'blur', validators: [Validators.required, Validators.minLength(3)] }],
    remarks: ['', { updateOn: 'blur', validators: [Validators.required] }],
    recordId: [''],
    saveAndNew: [false]
    });
  }
  get departmentForm() { return this.departmentFormGroup.controls; }

  saveDepartment(): void {
    this.submitted = true;
    if (this.departmentFormGroup.invalid) {
      return;
    }

    let departmentName = this.departmentForm.departmentName.value;
    Swal.fire({
      title: `Confirmation`,
      text: `Do you want to create department  ${departmentName}?`,
      icon: 'question',
      position: 'top',
      showCancelButton: true,
      confirmButtonText: 'Yes, create',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.value) {
        this.alertService.clear();

        this.userAccountService.createDepartment(this.currentUser, this.departmentFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse): void => {
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${departmentName} created successfully`);
              if (!this.departmentForm.saveAndNew.value) {
                this.addDepartmentBsModalRef.hide();
                this.accountService.reloadCurrentRoute();
              }
              this.departmentFormGroup.reset();
              this.submitted = false;
              this.logAction(`created department ${departmentName}`, PortalMenus.SETTINGS);
            },
            error: error => {
              this.alertService.showInfoMsg(error);
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  updateDepartment(): void {
    this.submitted = true;
    if (this.departmentFormGroup.invalid) {
      return;
    }

    let departmentName = this.departmentForm.departmentName.value;

    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `Do you want to update Department ${departmentName}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, update',
    }).then((result) => {
      if (result.value) {
        // reset alerts on submit
        this.alertService.clear();
        this.userAccountService.updateDepartment(this.currentUser, this.departmentFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('updateDepartment response:', res);
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${departmentName} updated successfully`);
              this.addDepartmentBsModalRef.hide();
              this.logAction(`Updated ${departmentName}`, PortalMenus.SETTINGS);
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




  deleteDepartment(): void {
    let departmentName = this.departmentForm.departmentName.value;
    Swal.fire({
      position: 'top',
      title: `Deletion`,
      text: `Do you want to delete Department ${departmentName}?`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.value) {
        // reset alerts on submit
        this.alertService.clear();
        // stop here if userFormGroup is invalid
        if (this.departmentFormGroup.invalid) {
          return;
        }
        this.userAccountService.deleteDepartment(this.currentUser, this.departmentForm.recordId.value)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('delete department response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${departmentName} deleted successfully`);
              this.addDepartmentBsModalRef.hide();
              this.logAction(`delete Department  ${departmentName}`, PortalMenus.SETTINGS);
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
