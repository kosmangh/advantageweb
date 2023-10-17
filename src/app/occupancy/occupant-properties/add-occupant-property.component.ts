import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { CalendarModule } from 'primeng/calendar';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { User } from 'src/app/@models/user';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { OccupancyService } from 'src/app/@services/occupancy.service';
import { SettingsService } from 'src/app/@services/settings.service';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { RequiredFieldComponent } from 'src/app/@shared/components/required-field.component';
import { RequiredFieldsNoticeComponent } from 'src/app/@shared/components/required-fields-notice.component';
import Swal from 'sweetalert2';
import { EstateBlockListResponse } from 'src/app/@restmodels/settings/estate-block-list.response';
import { EstateListResponse } from 'src/app/@restmodels/settings/estate-list.response';
import { Estate } from 'src/app/@models/settings/estate';
import { EstateBlock } from 'src/app/@models/settings/estate-block';
import { OccupantProperty } from 'src/app/@models/occupancy/occupant-property';
import { NgSelectModule } from '@ng-select/ng-select';
import { EstatePropertyListResponse } from 'src/app/@restmodels/settings/estate-property-list.response';
import { EstateProperty } from 'src/app/@models/settings/estate-property';
import { Occupant } from 'src/app/@models/occupancy/occupant';
import { OccupantListResponse } from 'src/app/@restmodels/occupancy/occupant-list.response';
import { OccupantListRequest } from 'src/app/@restmodels/occupancy/occupant-list.request';

@Component({
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RequiredFieldsNoticeComponent, FormsModule,
    FormLabelComponent, RequiredFieldComponent, CalendarModule, NgSelectModule ],
  templateUrl: './add-occupant-property.component.html'
})
export class AddOccupantPropertyComponent implements OnInit {


  currentUser: User;
  occupantProperty: OccupantProperty;
  occupantPropertyFormGroup: FormGroup;
  headerMsg: string;
  isAddMode: boolean;
  submitted = false;
  listOfEstateBlocks: EstateBlock[];
  listOfEstates: Estate[];
  listOfEstateProperties: EstateProperty[];
  listOfOccupants: Occupant[];
  settingsService = inject(SettingsService);
  occupantsService = inject(OccupancyService);
  router = inject(Router);
  listOfProOccupantTypes: any[];


  accountService = inject(AuthService);
  alertService = inject(AlertService);
  constructor(
    private title: Title,
    public addOccupantPropertyBsModalRef: BsModalRef,
    private fb: FormBuilder,
    private logger: NGXLogger,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }


  ngOnInit(): void {
    this.createForm();
    this.fetchEstates();

    if (this.isAddMode) {
      this.headerMsg = 'New occupant property';
      this.title.setTitle(this.headerMsg);
    } else {

      this.headerMsg = 'Edit ' + this.occupantProperty.occupantName;
      this.title.setTitle(this.headerMsg);
      this.occupantPropertyFormGroup.patchValue(this.occupantProperty);
      // if (this.occupantProperty.firstDateOfOccupancy) {
      //   this.occupantPropertyForm.firstDateOfOccupancy.setValue(new Date(this.occupantProperty.firstDateOfOccupancy));
      // }
      // if (this.occupantProperty.lastDateOfOccupancy) {
      //   this.occupantPropertyForm.lastDateOfOccupancy.setValue(new Date(this.occupantProperty.lastDateOfOccupancy));
      // }


      if (this.occupantProperty.firstDateOfOccupancy) {
        let cleanedDate = this.occupantProperty.firstDateOfOccupancy.toString().replace("[UTC]", "");
        this.occupantPropertyForm.firstDateOfOccupancy.setValue(new Date(cleanedDate));
      }
      if (this.occupantProperty.lastDateOfOccupancy) {
        let cleanedDate = this.occupantProperty.lastDateOfOccupancy.toString().replace("[UTC]", "");
        this.occupantPropertyForm.lastDateOfOccupancy.setValue(new Date(cleanedDate));
      }

      this.fetchEstateBlocks();
      this.fetchEstateProperties();
      this.fetchOccupants();

    }
    this.addOccupantPropertyBsModalRef.setClass("gray modal-md modal-dialog-top");

    this.listOfProOccupantTypes = this.settingsService.getOccupationType();
  }


  createForm(): void {
    this.occupantPropertyFormGroup = this.fb.group({
      estateId: [ '', [ Validators.required ] ],
      blockId: [ '', [ Validators.required ] ],
      propertyId: [ '', [ Validators.required ] ],
      occupantId: [ '', [ Validators.required ] ],
      occupationType: [ '', [ Validators.required ] ],
      firstDateOfOccupancy: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      lastDateOfOccupancy: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      recordId: [ '', ],
      saveAndNew: [ false ],
    });
  }

  get occupantPropertyForm() { return this.occupantPropertyFormGroup.controls; }



  fetchEstates(): void {
    this.listOfEstates = [];
    this.listOfEstateBlocks = [];
    this.listOfOccupants = [];
    this.listOfEstateBlocks = [];

    this.settingsService.getEstates().subscribe({
      next: (res: EstateListResponse) => {
        this.logger.info(`getEstates response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.estates.length <= 0) {
          this.alertService.showInfoMsgGeneral("No estates found");
          this.logger.info("No estates found");
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

  fetchEstateBlocks(): void {
    this.listOfEstateBlocks = [];

    this.settingsService.getEstateBlocks(this.currentUser, this.occupantPropertyForm.estateId.value).subscribe({
      next: (res: EstateBlockListResponse) => {
        this.logger.info(`getEstateBlocks response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.estateBlocks.length <= 0) {
          this.alertService.showInfoMsgGeneral("No blocks found");
          this.logger.info("No blocks found ");
          this.occupantPropertyForm.block.setValue("No blocks found");
          return;
        }
        // this.occupantPropertyForm.blockId.setValue("");
        this.listOfEstateBlocks = res.estateBlocks;
      },
      error: error => {
        this.logger.error(error.message);
        this.alertService.showInfoMsg(error.message);
      }
    });
  }

  fetchEstateProperties(): void {
    this.listOfEstateProperties = [];
    this.settingsService.getEstateProperties(this.currentUser, this.occupantPropertyForm.blockId.value,false,"").subscribe({
      next: (res: EstatePropertyListResponse) => {
        this.logger.info(`getEstateProperties response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.properties.length <= 0) {
          this.alertService.showInfoMsgGeneral("No properties found");
          this.logger.info("No properties found ");
          this.occupantPropertyForm.propertyId.setValue("No properties found");
          return;
        }
        // this.occupantPropertyForm.propertyId.setValue("");
        this.listOfEstateProperties = res.properties;
      },
      error: error => {
        this.logger.error(error.message);
        this.alertService.showInfoMsg(error.message);
      }
    });
  }

  fetchOccupants(): void {
    let request = new OccupantListRequest();
    request.dateRange = true;
    request.occupantType = "ALL";
    this.listOfOccupants = [];
    this.occupantsService.searchOccupants(this.currentUser, request).subscribe({
      next: (res: OccupantListResponse) => {
        this.logger.info(`searchOccupants response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.occupants.length <= 0) {
          this.alertService.showInfoMsgGeneral("No occupants found");
          this.occupantPropertyForm.occupantId.setValue("No occupants found");
          this.logger.info("No occupants found ");
          return;
        }
        // this.occupantPropertyForm.occupantId.setValue("");
        this.listOfOccupants = res.occupants;
      },
      error: error => {
        this.logger.error(error.message);
        this.alertService.showInfoMsg(error.message);
      }
    });
  }


  saveOccupant(): void {
    this.submitted = true;

    this.alertService.clear();
    // stop here if userFormGroup is invalid
    if (this.occupantPropertyFormGroup.invalid) {
      return;
    }

    Swal.fire({
      title: `Confirmation`,
      text: `Do you want to assign property assign to  occupant?`,
      icon: 'question',
      position: 'top',
      showCancelButton: true,
      confirmButtonText: 'Yes, assign',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.value) {

        this.occupantsService.createOccupantProperty(this.currentUser, this.occupantPropertyFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse): void => {
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`Property assigned to occupant successfully`);
              if (!this.occupantPropertyForm.saveAndNew.value) {
                this.addOccupantPropertyBsModalRef.hide();
                this.accountService.reloadCurrentRoute();
              }
              this.occupantPropertyFormGroup.reset();
              this.listOfEstateBlocks = [];
              this.listOfEstateProperties = [];
              this.listOfOccupants = [];
              this.submitted = false;
              this.logAction(`assigned property to occupant`, PortalMenus.OCCUPANCY);
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
    this.submitted = true;

    this.alertService.clear();
    // stop here if userFormGroup is invalid
    if (this.occupantPropertyFormGroup.invalid) {
      return;
    }
    let property = this.occupantProperty.occupantName;

    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `Do you want to update ${property}'s property?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, update',
    }).then((result) => {
      if (result.value) {
        this.occupantsService.updateOccupantProperty(this.currentUser, this.occupantPropertyFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('updateOccupant response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${property} updated successfully`);
              this.addOccupantPropertyBsModalRef.hide();
              localStorage.setItem('estate', this.occupantPropertyFormGroup.value.estateId);
              localStorage.setItem('estateBlock', this.occupantPropertyFormGroup.value.blockId);
              this.logAction(`Updated ${property}`, PortalMenus.OCCUPANCY);
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
