import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { Estate } from 'src/app/@models/settings/estate';
import { User } from 'src/app/@models/user';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { EstateListResponse } from 'src/app/@restmodels/settings/estate-list.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { SettingsService } from 'src/app/@services/settings.service';
import { UtilsService } from 'src/app/@services/utils.service';
import Swal from 'sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { RequiredFieldComponent } from 'src/app/@shared/components/required-field.component';
import { RequiredFieldsNoticeComponent } from 'src/app/@shared/components/required-fields-notice.component';
import { GroupRentBillingService } from 'src/app/@services/ground-rent-billing.service';

@Component({
  selector: 'app-estate-billing-component',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, RequiredFieldsNoticeComponent,
    FormLabelComponent, RequiredFieldComponent, NgSelectModule ],
  templateUrl: './estate-billing.component.html'
})
export class EstateBillingComponent implements OnInit {

  currentUser: User;
  listOfChargeYears: number[];
  groundRentBillFormGroup?: FormGroup;
  submitted: boolean = false;
  listOfUsages: any[];
  listOfEstates: Estate[];

  constructor(
    private groupRentBillingService: GroupRentBillingService,
    private utilsService: UtilsService,
    private settingsService: SettingsService,
    public addEstateBillingBsModalRef: BsModalRef,
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
    this.addEstateBillingBsModalRef.setClass("gray modal-sm modal-dialog-top");
    this.listOfChargeYears = this.utilsService.getChargeYears();
    this.listOfUsages = this.settingsService.getPropertyUsage();
  }


  createNewForm(): void {

    this.groundRentBillFormGroup = this.fb.group({
      estateId: [ '', [ Validators.required ] ],
      chargeYear: [ '', [ Validators.required ] ],
      blockId: [ 'ALL', ],
      propertyId: [ 'ALL' ],
      recordId: [ '', ],
      billingType: [ 'EST' ],
      saveAndNew: [ false, ]
    });
    this.fetchEstates();

  }
  get groundRentBillForm() { return this.groundRentBillFormGroup.controls; }

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

  
  savePropertyCharge(): void {
    this.submitted = true;
    if (this.groundRentBillFormGroup.invalid) {
      return;
    }
    let estate=this.groundRentBillForm.estateId.value;
    // const selectedLabel = this.listOfEstates.find(option => option.recordId === estate)?.label();
    let selectedLabel = this.listOfEstates.find(option => option.recordId === estate)?.estateName;

    Swal.fire({
      title: `Confirmation`,
      text: `Do you want to apply ground rent bill for properties of ${selectedLabel} estate?`,
      icon: 'question',
      position: 'top',
      showCancelButton: true,
      confirmButtonText: 'Yes, create',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.value) {
        this.alertService.clear();

        this.groupRentBillingService.saveGroupRentBill(this.currentUser, this.groundRentBillFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse): void => {
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(res.headerResponse.responseMessage);
              if (!this.groundRentBillForm.saveAndNew.value) {
                this.addEstateBillingBsModalRef.hide();
                this.accountService.reloadCurrentRoute();
              }
              this.groundRentBillFormGroup.reset();
              this.createNewForm();
              this.submitted = false;
              this.logAction(`applied ground rent for  ${selectedLabel}`, PortalMenus.ESTATE_BILLING);
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
