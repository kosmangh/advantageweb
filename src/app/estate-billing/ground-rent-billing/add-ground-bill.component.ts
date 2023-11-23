import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TabDirective, TabsModule } from 'ngx-bootstrap/tabs';
import { NGXLogger } from 'ngx-logger';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { Estate } from 'src/app/@models/settings/estate';
import { EstateBlock } from 'src/app/@models/settings/estate-block';
import { EstateProperty } from 'src/app/@models/settings/estate-property';
import { User } from 'src/app/@models/user';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { EstateBlockListResponse } from 'src/app/@restmodels/settings/estate-block-list.response';
import { EstateListResponse } from 'src/app/@restmodels/settings/estate-list.response';
import { EstatePropertyListResponse } from 'src/app/@restmodels/settings/estate-property-list.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { GroupRentBillingService } from 'src/app/@services/ground-rent-billing.service';
import { SettingsService } from 'src/app/@services/settings.service';
import { UtilsService } from 'src/app/@services/utils.service';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { RequiredFieldComponent } from 'src/app/@shared/components/required-field.component';
import { RequiredFieldsNoticeComponent } from 'src/app/@shared/components/required-fields-notice.component';
import Swal from 'sweetalert2';
import { EstateBillingComponent } from '../estate-billing.component';
import { GroundRentBillRequest } from 'src/app/@restmodels/estate-billing/ground-rent-bill.request';

@Component({
  selector: 'app-add-rental-bill',
  standalone: true,
  templateUrl: './add-ground-bill.component.html',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, RequiredFieldsNoticeComponent,
    FormLabelComponent, RequiredFieldComponent, NgSelectModule, TabsModule, EstateBillingComponent ]
})
export class AddGroundBillComponent implements OnInit {

  currentUser: User;
  listOfChargeYears: number[];

  estateBillFormGroup?: FormGroup;
  blockBillFormGroup?: FormGroup;
  propertyBillFormGroup?: FormGroup;


  estateSubmitted: boolean = false;
  blockSubmitted: boolean = false;
  propertySubmitted: boolean = false;

  listOfUsages: any[];
  listOfEstates: Estate[];
  listOfBlocks: EstateBlock[];
  listOfProperties: EstateProperty[];
  value?: string;

  estateId: string = "";
  blockId: string = "";
  propertyId: string = "";

  constructor(
    private groupRentBillingService: GroupRentBillingService,
    private utilsService: UtilsService,
    private settingsService: SettingsService,
    public addGroundRentBillBsModalRef: BsModalRef,
    private fb: FormBuilder,
    private accountService: AuthService,
    private alertService: AlertService,
    private logger: NGXLogger,
  ) {
    // gets logged in user details
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }



  ngOnInit(): void {
    this.createNewForm();
    this.addGroundRentBillBsModalRef.setClass("gray modal-md modal-dialog-top");
    this.listOfChargeYears = this.utilsService.getChargeYears();
    this.value = 'EST';
  }

  onSelect(data: TabDirective): void {
    this.value = data.id;
    this.listOfBlocks = [];
    this.listOfProperties = [];
    this.createNewForm();
  }



  createNewForm(): void {

    this.estateBillFormGroup = this.fb.group({
      estateId: [ '', [ Validators.required ] ],
      chargeYear: [ '', [ Validators.required ] ],
      blockId: [ 'A', ],
      propertyId: [ 'A' ],
      billingType: [ 'EST' ],
      saveAndNew: [ false, ]
    });

    this.blockBillFormGroup = this.fb.group({
      estateId: [ '', [ Validators.required ] ],
      blockId: [ '', [ Validators.required ] ],
      chargeYear: [ '', [ Validators.required ] ],
      propertyId: [ 'A' ],
      billingType: [ 'BLK' ],
      saveAndNew: [ false, ]
    });

    this.propertyBillFormGroup = this.fb.group({
      estateId: [ '', [ Validators.required ] ],
      blockId: [ '', [ Validators.required ] ],
      propertyId: [ '', [ Validators.required ] ],
      chargeYear: [ '', [ Validators.required ] ],
      billingType: [ 'PROP' ],
      saveAndNew: [ false, ]
    });


    this.fetchEstates();

  }

  get estateBillForm() { return this.estateBillFormGroup.controls; }
  get blockBillForm() { return this.blockBillFormGroup.controls; }
  get propertyBillForm() { return this.propertyBillFormGroup.controls; }



  saveGroundRentBill(): void {

    let request;
    // let billingType;
    let billingTypeName
    let saveAndShow = false;

    if (this.value === 'EST') {

      this.estateSubmitted = true;
      if (this.estateBillFormGroup.invalid) {
        return;
      }
      request = { ... this.estateBillFormGroup.value };
      // billingType = this.estateBillForm.estateId.value;
      billingTypeName = "estate " + this.listOfEstates.find(option => option.recordId === this.estateBillForm.estateId.value)?.estateName;
      saveAndShow = this.estateBillForm.saveAndNew.value;

    } else if (this.value === 'BLK') {

      this.blockSubmitted = true;
      if (this.blockBillFormGroup.invalid) {
        return;
      }
      request = { ... this.blockBillFormGroup.value };
      // billingType = this.blockBillForm.blockId.value;
      billingTypeName = "block " + this.listOfBlocks.find(option => option.recordId === this.blockBillForm.blockId.value)?.block;
      saveAndShow = this.blockBillForm.saveAndNew.value;

    } else if (this.value === 'PROP') {

      this.propertySubmitted = true;
      if (this.propertyBillFormGroup.invalid) {
        return;
      }
      request = { ... this.propertyBillFormGroup.value };
      // billingType = this.propertyBillForm.propertyId.value;
      billingTypeName = "property " + this.listOfProperties.find(option => option.recordId === this.propertyBillForm.propertyId.value)?.propertyName;
      saveAndShow = this.propertyBillForm.saveAndNew.value;

    }

    Swal.fire({
      title: `Confirmation`,
      text: `Do you want to apply ground rent bill for  ${billingTypeName}?`,
      icon: 'question',
      position: 'top',
      showCancelButton: true,
      confirmButtonText: 'Yes, create',
      cancelButtonText: 'No, cancel'
    }).then((result) => {

      if (result.value) {
        this.alertService.clear();

        // alert(JSON.stringify(request));


        this.groupRentBillingService.saveGroupRentBill(this.currentUser, request)
          .subscribe({
            next: (res: GeneralResponse): void => {
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(res.headerResponse.responseMessage);
              if (!saveAndShow) {
                this.addGroundRentBillBsModalRef.hide();
                this.accountService.reloadCurrentRoute();
              }
              this.createNewForm();
              this.estateSubmitted = false;
              this.blockSubmitted = false;
              this.propertySubmitted = false;
              this.logAction(`Applied ground rent bill for ${billingTypeName}`, PortalMenus.ESTATE_BILLING);
            },
            error: error => {
              this.alertService.showInfoMsg(error);
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  fetchEstates(): void {
    this.listOfEstates = [];
    this.settingsService.getEstates().subscribe({
      next: (res: EstateListResponse) => {
        this.logger.info(`getEstates response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.estates.length <= 0) {
          this.alertService.showInfoMsgGeneral("No zones found");
          this.logger.info("No zones found");
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

  fetchBlocks(): void {
    this.listOfBlocks = [];

    if (this.value === 'EST') {
      this.estateId = this.estateBillForm.estateId.value;
    } else if (this.value === 'BLK') {
      this.estateId = this.blockBillForm.estateId.value;
    } else if (this.value === 'PROP') {
      this.estateId = this.propertyBillForm.estateId.value;
    }


    this.settingsService.getEstateBlocks(this.currentUser, this.estateId).subscribe({
      next: (res: EstateBlockListResponse) => {
        this.logger.info(`getEstateBlocks response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.estateBlocks.length <= 0) {
          this.alertService.showInfoMsgGeneral("No blocks found");
          this.logger.info("No blocks found");
          return;
        }
        this.listOfBlocks = res.estateBlocks;
      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }

  fetchEstateProperties(): void {
    this.listOfProperties = [];
    if (this.value === 'EST') {
      this.blockId = this.estateBillForm.blockId.value;
    } else if (this.value === 'BLK') {
      this.blockId = this.blockBillForm.blockId.value;
    } else if (this.value === 'PROP') {
      this.blockId = this.propertyBillForm.blockId.value;
    }


    this.settingsService.getEstateProperties(this.currentUser, this.blockId, true,"LEASEHOLD").subscribe({
      next: (res: EstatePropertyListResponse) => {
        this.logger.info(`getEstateProperties response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.properties.length <= 0) {
          this.alertService.showInfoMsgGeneral("No properties found");
          this.logger.info("No properties found ");
          this.propertyBillForm.propertyId.setValue("No properties found");
          return;
        }
        this.listOfProperties = res.properties;
      },
      error: error => {
        this.logger.error(error.message);
        this.alertService.showInfoMsg(error.message);
      }
    });
  }

  async logAction(msg: string, ui: string): Promise<void> {
    await this.accountService.logUserAudit(msg, ui);
  }
}