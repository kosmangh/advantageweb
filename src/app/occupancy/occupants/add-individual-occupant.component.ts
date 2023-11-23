import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/@models/user';
import { Occupant } from 'src/app/@models/occupancy/occupant';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/@services/auth.service';
import { AlertService } from 'src/app/@services/alert.service';
import { NGXLogger } from 'ngx-logger';
import { SettingsService } from 'src/app/@services/settings.service';
import Swal from 'sweetalert2';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { RequiredFieldsNoticeComponent } from "../../@shared/components/required-fields-notice.component";
import { FormLabelComponent } from "../../@shared/components/form-label.component";
import { RequiredFieldComponent } from "../../@shared/components/required-field.component";
import { CalendarModule } from 'primeng/calendar';
import { OccupancyService } from 'src/app/@services/occupancy.service';
import { EmailNotValidComponent } from 'src/app/@shared/components/email-not-valid.component';

@Component({
  standalone: true,
  templateUrl: './add-individual-occupant.component.html',
  imports: [ CommonModule, ReactiveFormsModule, RequiredFieldsNoticeComponent, FormsModule,
    FormLabelComponent, RequiredFieldComponent, CalendarModule, EmailNotValidComponent ]
})
export class AddIndividualOccupantComponent implements OnInit {


  currentUser: User;
  occupant: Occupant;
  searchedKeyword: string;

  personalInformGroup: FormGroup;
  contactAddressFormGroup?: FormGroup;
  nokFormGroup?: FormGroup

  headerMsg: string;
  isAddMode: boolean;
  individualOccupantModalService: BsModalService;
  listOfGenders: any[];
  listOfMaritalStatus: any[];
  currentStep: number = 1;
  listOfIdTypes: any[];
  listOfRelationship: any[];

  personalSubmitted = false;

  occupantsService = inject(OccupancyService);
  listOfOccupantTypes: any[];

  constructor(
    private title: Title,
    public addInstitutionOccupantBsModalRef: BsModalRef,
    private fb: FormBuilder,
    private accountService: AuthService,
    private alertService: AlertService,
    private logger: NGXLogger,
    private settingsService: SettingsService,
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
    this.createContactAddressForm();
    this.createNokForm();

    if (this.isAddMode) {
      this.headerMsg = 'New individual occupant';
      this.title.setTitle(this.headerMsg);
    } else {
      this.headerMsg = 'Edit ' + this.occupant.occupantName;
      this.title.setTitle(this.headerMsg);
      this.personalInformGroup.patchValue(this.occupant);
      this.contactAddressFormGroup.patchValue(this.occupant);
      this.nokFormGroup.patchValue(this.occupant);
      // this.personalInfoForm.dateOfBirth.setValue(new Date(this.occupant.dateOfBirth));

      if (this.occupant.dateOfBirth) {
        let cleanedDate = this.occupant.dateOfBirth.toString().replace("[UTC]", "");
        this.personalInfoForm.dateOfBirth.setValue(new Date(cleanedDate));
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
    this.personalInformGroup = this.fb.group({
      occupantName: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      occupantType: [ '', [ Validators.required ] ],
      gender: [ '', [ Validators.required ] ],
      dateOfBirth: [ '', [ Validators.required ] ],
      maritalStatus: [ '', [ Validators.required ] ],
      idType: [ '', [ Validators.required ] ],
      idNo: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      occupation: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      recordId: [ '', ],
    });
  }

  createContactAddressForm(): void {
    this.contactAddressFormGroup = this.fb.group({
      mobileNo: [ '', { updateOn: 'blur', validators: [ Validators.required, Validators.minLength(10), Validators.minLength(12) ] } ],
      emailAddress: [ '', [ Validators.required ] ],
      homeTown: [ '', [ Validators.required ] ],
      localAddress: [ '', [ Validators.required ] ],
    });
  }


  createNokForm(): void {
    this.nokFormGroup = this.fb.group({
      nextOfKin: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      relationship: [ '', [ Validators.required ] ],
      nokAddress: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      nokEmail: [ '', { updateOn: 'blur', validators: [ Validators.required, Validators.email ] } ],
      nokPhone: [ '', { updateOn: 'blur', validators: [ Validators.required, Validators.minLength(10), Validators.minLength(12) ] } ],
      saveAndNew: [ false, ],
      institutional: [ false ]
    });
  }

  get personalInfoForm() { return this.personalInformGroup.controls; }
  get contactAddressForm() { return this.contactAddressFormGroup.controls; }
  get nokForm() { return this.nokFormGroup.controls; }




  saveOccupant(): void {
    let occupantName = this.personalInfoForm.occupantName.value;
    Swal.fire({
      title: `Confirmation`,
      text: `Do you want to create  ${occupantName}?`,
      icon: 'question',
      position: 'top',
      showCancelButton: true,
      confirmButtonText: 'Yes, create',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.value) {
        this.alertService.clear();
        // stop here if userFormGroup is invalid
        if (this.nokFormGroup.invalid) {
          return;
        }
        let individualData = {
          ... this.personalInformGroup.value,
          ... this.contactAddressFormGroup.value,
          ... this.nokFormGroup.value
        };

        this.occupantsService.createOccupant(this.currentUser, individualData)
          .subscribe({
            next: (res: GeneralResponse): void => {
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${occupantName} created successfully`);
              if (!this.nokForm.saveAndNew.value) {
                this.addInstitutionOccupantBsModalRef.hide();
                this.accountService.reloadCurrentRoute();
              }
              this.personalInformGroup.reset();
              this.contactAddressFormGroup.reset();
              this.nokFormGroup.reset();
              this.currentStep = 1;
              this.logAction(`created individual occupant ${occupantName}`, PortalMenus.SETTINGS);
            },
            error: error => {
              this.alertService.showInfoMsg(error);
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  updateOccupant(): void {
    let occupantName = this.personalInfoForm.occupantName.value;

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

        let individualData = Object.assign(
          this.personalInformGroup.value,
          this.contactAddressFormGroup.value,
          this.nokFormGroup.value,
        );


        this.occupantsService.updateOccupant(this.currentUser, individualData)
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
              // setTimeout(() => window.location.reload(), 1500);
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
