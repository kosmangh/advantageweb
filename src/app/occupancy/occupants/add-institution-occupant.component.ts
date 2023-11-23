import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { Occupant } from 'src/app/@models/occupancy/occupant';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { User } from 'src/app/@models/user';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { SettingsService } from 'src/app/@services/settings.service';
import Swal from 'sweetalert2';
import { FormLabelComponent } from "../../@shared/components/form-label.component";
import { CalendarModule } from 'primeng/calendar';
import { RequiredFieldComponent } from 'src/app/@shared/components/required-field.component';
import { RequiredFieldsNoticeComponent } from 'src/app/@shared/components/required-fields-notice.component';
import { OccupancyService } from 'src/app/@services/occupancy.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  templateUrl: './add-institution-occupant.component.html',
  imports: [ CommonModule, ReactiveFormsModule, RequiredFieldsNoticeComponent, FormsModule,
    FormLabelComponent, RequiredFieldComponent, CalendarModule ]
})
export class AddInstitutionOccupantComponent implements OnInit {


  currentUser: User;
  occupant: Occupant;
  searchedKeyword: string;

  institutionFormGroup: FormGroup;
  supervisorFormGroup?: FormGroup

  headerMsg: string;
  isAddMode: boolean;
  individualOccupantModalService: BsModalService;
  listOfGenders: any[];
  listOfMaritalStatus: any[];
  currentStep: number = 1;
  listOfIdTypes: any;
  listOfRelationship: any;

  personalSubmitted = false;

  settingsService = inject(SettingsService);
  occupantsService = inject(OccupancyService);
  router=inject(Router);
  listOfOccupantTypes: any;

  constructor(
    private title: Title,
    public addInstitutionOccupantBsModalRef: BsModalRef,
    private fb: FormBuilder,
    private accountService: AuthService,
    private alertService: AlertService,
    private logger: NGXLogger,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }


  continueStep() {
    if (this.currentStep <= 3) {
      this.currentStep++;
    }
  }


  previousStep() {
    if (this.currentStep <= 3 || this.currentStep <= 0) {
      this.currentStep--;
    }
  }




  ngOnInit(): void {
    this.currentStep = 1;

    this.createPersonalInfoForm();
    this.createSupervisorForm();

    if (this.isAddMode) {
      this.headerMsg = 'New estate block';
      this.title.setTitle(this.headerMsg);
    } else {
      this.headerMsg = 'Edit ' + this.occupant.occupantName;
      this.title.setTitle(this.headerMsg);
      this.institutionFormGroup.patchValue(this.occupant);
      this.supervisorFormGroup.patchValue(this.occupant);
      // this.institutionForm.dateOfBirth.setValue(new Date(this.occupant.dateOfBirth));

      if (this.occupant.dateOfBirth) {
        let cleanedDate = this.occupant.dateOfBirth.toString().replace("[UTC]", "");
        this.institutionForm.dateOfBirth.setValue(new Date(cleanedDate));
      }

    }
    this.addInstitutionOccupantBsModalRef.setClass("gray modal-xl modal-dialog-top");
    this.listOfGenders = this.settingsService.getGender();
    this.listOfMaritalStatus = this.settingsService.getMaritalStatus();
    this.listOfRelationship = this.settingsService.getRelationships();
    this.listOfIdTypes = this.settingsService.getIdTypes();
    this.listOfOccupantTypes = this.settingsService.getOccupantType();

  }


  createPersonalInfoForm(): void {
    this.institutionFormGroup = this.fb.group({
      occupantName: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      mobileNo: [ '', { updateOn: 'blur', validators: [ Validators.required, Validators.minLength(10), Validators.maxLength(12) ] } ],
      emailAddress: [ '', [ Validators.required ] ],
      occupantType: [ '', [ Validators.required ] ],
      localAddress: [ '', [ Validators.required ] ],
      dateOfBirth: [ '', [ Validators.required ] ],
      occupation: [ '', [ Validators.required ] ],
      institutional: [ true ],
      recordId: [ '', ],
    });
  }


  createSupervisorForm(): void {
    this.supervisorFormGroup = this.fb.group({
      supervisorName: [ '', [ Validators.required ] ],
      supervisorMobileNo: [ '', [ Validators.required ] ],
      supervisorEmail: [ '', [ Validators.required ] ],
      supervisorAddress: [ '', [ Validators.required ] ],
      saveAndNew: [ false, ],
    });
  }

  get institutionForm() { return this.institutionFormGroup.controls; }
  get supervisorForm() { return this.supervisorFormGroup.controls; }




  saveOccupant(): void {
    let occupantName = this.institutionForm.occupantName.value;
    Swal.fire({
      title: `Confirmation`,
      text: `Do you want to create occupant  ${occupantName}?`,
      icon: 'question',
      position: 'top',
      showCancelButton: true,
      confirmButtonText: 'Yes, create',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.value) {
        this.alertService.clear();
        // stop here if userFormGroup is invalid
        if (this.supervisorFormGroup.invalid) {
          return;
        }

        let institutionData = {
          ...this.institutionFormGroup.value,
          ...this.supervisorFormGroup.value
        };
        this.occupantsService.createOccupant(this.currentUser, institutionData)
          .subscribe({
            next: (res: GeneralResponse): void => {
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${occupantName} created successfully`);
              if (!this.supervisorForm.saveAndNew.value) {
                this.addInstitutionOccupantBsModalRef.hide();
                this.accountService.reloadCurrentRoute();
              }
              this.institutionFormGroup.reset();
              this.supervisorFormGroup.reset();
              
              this.currentStep = 1;
              this.logAction(`created institution occupant ${occupantName}`, PortalMenus.OCCUPANCY);
            },
            error: error => {
              this.alertService.showInfoMsg(error.message);
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }


  updateOccupant(): void {
    let occupantName = this.institutionForm.occupantName.value;

    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `Do you want to update ${occupantName}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, update',
    }).then((result) => {
      if (result.value) {

        let institutionData = Object.assign(this.institutionFormGroup.value, this.supervisorFormGroup.value);


        this.occupantsService.updateOccupant(this.currentUser,institutionData)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('updateOccupant response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${occupantName} updated successfully`);
              this.addInstitutionOccupantBsModalRef.hide();
              this.logAction(`Updated ${occupantName}`, PortalMenus.OCCUPANCY);
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
