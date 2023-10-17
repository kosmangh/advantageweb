import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { User } from 'src/app/@models/user';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { RequiredFieldComponent } from 'src/app/@shared/components/required-field.component';
import { RequiredFieldsNoticeComponent } from 'src/app/@shared/components/required-fields-notice.component';
import Swal from 'sweetalert2';
import { Region } from 'src/app/@models/settings/region';
import { SettingsService } from 'src/app/@services/settings.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { OccupantProperty } from 'src/app/@models/occupancy/occupant-property';
import { CalendarModule } from 'primeng/calendar';
import { BillPaymentService } from 'src/app/@services/bill-payment.service';
import { RemoveHyphenPipe } from "../../@shared/pipes/remove-hyphen.pipe";

@Component({
    standalone: true,
    templateUrl: './add-payment.component.html',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RequiredFieldsNoticeComponent,
        FormLabelComponent, RequiredFieldComponent, NgSelectModule, CalendarModule, RemoveHyphenPipe]
})
export class AddPaymentComponent implements OnInit {


  currentUser: User;
  listOfChargeYears: number[];
  paymentFormGroup?: FormGroup;
  propertyChargeHeaderMsg: string;
  isAddMode: boolean;
  submitted: boolean = false;
  listOfRegions: Region[];
  listOfModeOfPayments: any[];



  selectedOccupant: OccupantProperty;

  constructor(
    private billPaymentService: BillPaymentService,
    private settingsService: SettingsService,
    private title: Title,
    public addPaymentBsModalRef: BsModalRef,
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

    if (this.isAddMode) {
      this.propertyChargeHeaderMsg = `Payment for ${this.selectedOccupant.propertyName} (${this.selectedOccupant.propertyId})`;
      this.title.setTitle(this.propertyChargeHeaderMsg);
      // this.paymentFormGroup.get('payerName').setValue(this.selectedOccupant.occupantName);
      this.paymentFormGroup.get('propertyId').setValue(this.selectedOccupant.propertyId);
      this.paymentFormGroup.get('occupantId').setValue(this.selectedOccupant.occupantId);
      this.paymentForm.payerName.setValue(this.selectedOccupant.occupantName);
    } else {
      this.propertyChargeHeaderMsg = `Edit payment for ${this.selectedOccupant.propertyName}`;
      this.title.setTitle(this.propertyChargeHeaderMsg);
      this.paymentFormGroup.patchValue(this.selectedOccupant);
    }

    this.paymentFormGroup.get('payerName').disable();
    // this.paymentForm.paymentType.setValue(this.selectedOccupant.paymentType);
    this.paymentForm.paymentType.setValue(this.selectedOccupant.paymentType);

    this.addPaymentBsModalRef.setClass("gray modal-md modal-dialog-top");
    this.listOfModeOfPayments = this.settingsService.getModeOfPayments();
  }


  createNewForm(): void {

    this.paymentFormGroup = this.fb.group({
      dateOfTransaction: [ '', [ Validators.required ] ],
      modeOfPayment: [ '', [ Validators.required ] ],
      modeOfPaymentNo: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      receiptNumber: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      amountInvolved: [ '', { updateOn: 'blur', validators: [ Validators.required, ] } ],
      propertyId: [ '', ],
      payerName: [ '', ],
      recordId: [ '', ],
      occupantId: [ '', ],
      paymentType: [ '', ],
      saveAndNew: [ false, ]
    });
  }
  get paymentForm() { return this.paymentFormGroup.controls; }


  modeOfPaymentListeners() {
    this.paymentForm.modeOfPaymentNo.setValue('');
    if (this.paymentForm.modeOfPayment.value === 'CASH') {
      this.paymentFormGroup.get('modeOfPaymentNo')
        .setValue(this.paymentForm.receiptNumber.value);
    }
  }

  savePayment(): void {

    // alert(JSON.stringify(this.paymentFormGroup.value));

    this.submitted = true;
    if (this.paymentFormGroup.invalid) {
      return;
    }

    Swal.fire({
      title: `Confirmation`,
      text: `Do you want to pay ${this.selectedOccupant.paymentType.toLowerCase()} for property  ${this.selectedOccupant.propertyName}?`,
      icon: 'question',
      position: 'top',
      showCancelButton: true,
      confirmButtonText: 'Yes, pay',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.value) {
        this.alertService.clear();


        this.billPaymentService.payBill(this.currentUser, this.paymentFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse): void => {
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(res.headerResponse.responseMessage);
              if (!this.paymentForm.saveAndNew.value) {
                this.addPaymentBsModalRef.hide();
                // this.accountService.reloadCurrentRoute();
              }
              this.paymentFormGroup.reset();
              this.submitted = false;
              this.logAction(`saved  ${this.selectedOccupant.paymentType} payment of ${this.paymentForm.amountInvolved.value} for  ${this.selectedOccupant.propertyName}`, PortalMenus.BILL_PAYMENTS);
            },
            error: error => {
              this.alertService.showInfoMsg(error);
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  updatePayment(): void {
    this.submitted = true;
    if (this.paymentFormGroup.invalid) {
      return;
    }

    let propertyUsageName = this.paymentForm.modeOfPayment.value;
    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `Do you want to update payment for ${this.selectedOccupant.propertyName}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, update',
    }).then((result) => {
      if (result.value) {
        // reset alerts on submit
        this.alertService.clear();

        this.billPaymentService.updatePayBill(this.currentUser, this.paymentFormGroup.value)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('updatePayBill response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(res.headerResponse.responseMessage);
              this.addPaymentBsModalRef.hide();
              this.logAction(`Updated ${propertyUsageName}`, PortalMenus.BILL_PAYMENTS);
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