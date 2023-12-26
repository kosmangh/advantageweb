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
import { CalendarModule } from 'primeng/calendar';
import { BillPaymentService } from 'src/app/@services/bill-payment.service';
import { RemoveHyphenPipe } from "../../@shared/pipes/remove-hyphen.pipe";
import { PayBillRequest } from 'src/app/@restmodels/bill-payment/pay-bill.request';
import { UpdatePayBillRequest } from 'src/app/@restmodels/bill-payment/update-pay-bill.request';

@Component({
  standalone: true,
  templateUrl: './pay-bill.component.html',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, RequiredFieldsNoticeComponent,
    FormLabelComponent, RequiredFieldComponent, NgSelectModule, CalendarModule, RemoveHyphenPipe ]
})
export class PayBillComponent implements OnInit {


  currentUser: User;
  listOfChargeYears: number[];
  paymentFormGroup?: FormGroup;
  propertyChargeHeaderMsg: string;
  isAddMode: boolean;
  submitted: boolean = false;
  listOfRegions: Region[];
  listOfModeOfPayments: any[];
  payBill: PayBillRequest;

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
      this.propertyChargeHeaderMsg = `Payment for ${this.payBill.occupantName} 
      (${this.payBill.propertyId}) - bill year ${this.payBill.billYear}`;
      this.title.setTitle(this.propertyChargeHeaderMsg);
    } else {
      this.propertyChargeHeaderMsg = `Edit payment for ${this.payBill.occupantName}`;
      this.title.setTitle(this.propertyChargeHeaderMsg);
    }
    this.paymentFormGroup.patchValue(this.payBill);

    if (this.payBill.dateOfTransaction) {
      let cleanedDate = this.payBill.dateOfTransaction.toString().replace("[UTC]", "");
      this.paymentForm.dateOfTransaction.setValue(new Date(cleanedDate));
      this.paymentFormGroup.get('dateOfTransaction').disable();
    }

    this.paymentFormGroup.get('payerName').disable();
    this.paymentFormGroup.get('billAmount').disable();
    this.addPaymentBsModalRef.setClass("gray modal-md modal-dialog-top");
    this.listOfModeOfPayments = this.settingsService.getModeOfPayments();
  }


  createNewForm(): void {

    this.paymentFormGroup = this.fb.group({
      dateOfTransaction: [ '', [ Validators.required ] ],
      modeOfPayment: [ '', [ Validators.required ] ],
      modeOfPaymentNo: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      receiptNumber: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      amountPaid: [ '', { updateOn: 'blur', validators: [ Validators.required, ] } ],
      billYear: [ '', ],
      billAmount: [ '', ],
      propertyId: [ '', ],
      payerName: [ '', ],
      billId: [ '', ],
      recordId: [ '', ],
      occupantId: [ '', ],
      paymentType: [ '', ],
      spreadAmtForOccupantProperties: [ false, ]
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
    this.submitted = true;
    if (this.paymentFormGroup.invalid) {
      return;
    }

    Swal.fire({
      title: `Confirmation`,
      text: `Do you want to pay ${this.payBill.paymentType.toLowerCase()} for property  ${this.payBill.propertyId}?`,
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
              localStorage.setItem("payBill", JSON.stringify(this.payBill));
              this.accountService.reloadCurrentRoute();
              this.paymentFormGroup.reset();
              this.submitted = false;
              this.logAction(`saved  ${this.payBill.paymentType} payment of ${this.paymentForm.amountInvolved.value} 
              for  ${this.payBill.propertyId}`, PortalMenus.BILL_PAYMENTS);
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

    let propertyName = this.payBill.propertyId;
    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `Do you want to update payment for ${propertyName}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, update',
    }).then((result) => {
      if (result.value) {
        // reset alerts on submit
        this.alertService.clear();
        let request = new UpdatePayBillRequest();
        request.amountPaid = this.paymentForm.amountPaid.value;
        request.billId = this.paymentForm.billId.value;
        request.ledgerId = this.paymentForm.recordId.value;
        request.modeOfPayment = this.paymentForm.modeOfPayment.value;
        request.modeOfPaymentNo = this.paymentForm.modeOfPaymentNo.value;
        request.receiptNumber = this.paymentForm.receiptNumber.value;

        this.billPaymentService.updatePayBill(this.currentUser, request)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('updatePayBill response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(res.headerResponse.responseMessage);
              this.addPaymentBsModalRef.hide();
              this.logAction(`Updated ${propertyName}`, PortalMenus.BILL_PAYMENTS);
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