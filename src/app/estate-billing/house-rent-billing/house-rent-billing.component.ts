import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { PropertyLedger } from 'src/app/@models/bill-payment/property-ledger';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { Estate } from 'src/app/@models/settings/estate';
import { EstateBlock } from 'src/app/@models/settings/estate-block';
import { Region } from 'src/app/@models/settings/region';
import { User } from 'src/app/@models/user';
import { GroundRentalBillListResponse } from 'src/app/@restmodels/estate-billing/ground-rental-bill-list.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { UtilsService } from 'src/app/@services/utils.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TableModule } from 'primeng/table';
import { AddItemComponent } from 'src/app/@shared/components/add-item.component';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { FullNameComponent } from 'src/app/@shared/components/full-name.component';
import { PageTitleComponent } from 'src/app/@shared/components/page-title.component';
import { ListFilterPipe } from 'src/app/@shared/pipes/list-filter.pipe';
import { RemoveHyphenPipe } from 'src/app/@shared/pipes/remove-hyphen.pipe';
import { TimeAgoPipe } from 'src/app/@shared/pipes/time-ago.pipe';
import { AddRentalBillComponent } from './add-rental-bill.component';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { RentalBillService } from 'src/app/@services/rental-bill.service';

@Component({
  standalone: true,
  templateUrl: './house-rent-billing.component.html',
  imports: [ CommonModule, TableModule, FormsModule, NgSelectModule,
    FullNameComponent, AddItemComponent, PageTitleComponent,
    ListFilterPipe, TimeAgoPipe, FormLabelComponent, RemoveHyphenPipe ]
})
export class HouseRentBillingComponent implements OnInit, OnDestroy {


  currentUser: User;
  listOfPropertyCharges: PropertyLedger[];
  searchedKeyword: string;
  bsModalRef?: BsModalRef;
  isAddMode: boolean;
  regionId: string;
  chargeYear: number;
  listOfRegions: Region[];
  listOfChargeYears: any[];
  listOfEstateBlocks: EstateBlock[];
  listOfEstates: Estate[];
  listOfMonths: any[];
  addPropertyChargeBsModalRef?: BsModalRef;

  addEstateBillingBsModalRef: BsModalRef;
  addBlockBillingBsModalRef: BsModalRef;
  addGroundRentBillBsModalRef: BsModalRef;
  estate: string;
  block: string;
  rentMonth: string;

  constructor(
    private rentalBillService: RentalBillService,

    private utilsService: UtilsService,
    private accountService: AuthService,
    private alertService: AlertService,
    private logger: NGXLogger,


    private addGroundRentBillModalService: BsModalService
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.estate = 'A';
    this.block = 'A';
    this.logAction("Viewed property charges page", PortalMenus.ESTATE_BILLING);
    this.regionId = this.currentUser.regionId;
    this.chargeYear = new Date().getFullYear();
    this.rentMonth = this.utilsService.getCurrentMonthName();
    this.listOfChargeYears = this.utilsService.getChargeYears();
    this.listOfMonths = this.utilsService.getMonthsOfYear();
    this.fetchRentalBills();
  }

  ngOnDestroy(): void {
    this.addGroundRentBillModalService.hide();
    Swal.close();
  }


  refreshButton() {
    this.fetchRentalBills();
  }

  fetchRentalBills(): void {
    this.listOfPropertyCharges = [];
    this.rentalBillService.getRentalBills(this.currentUser, this.rentMonth, this.chargeYear).subscribe({
      next: (res: GroundRentalBillListResponse) => {
        this.logger.info(`getPropertyCharges response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.propertyLedgers.length <= 0) {
          let msg = `No rent bills found for ${this.rentMonth}, ${this.chargeYear}`;
          this.alertService.showInfoMsgGeneral(msg);
          this.logger.info(msg);
          return;
        }
        this.listOfPropertyCharges = res.propertyLedgers;
      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }

  applyLastRentBilled2CurrentMonth() {

    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `This action will apply the last rent billed to occupants for ${this.rentMonth},${this.chargeYear}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, apply',
    }).then((result) => {
      if (result.value) {
        this.rentalBillService.applyLastRentBilled2CurrentMonth(this.currentUser)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('applyLastRentBilled2CurrentMonth response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(res.headerResponse.responseMessage);
              this.logAction(`Applied last rent billed to ${this.rentMonth}, ${this.chargeYear}`, PortalMenus.ESTATE_BILLING);
              // this.accountService.reloadCurrentRoute();
              this.fetchRentalBills(); 
            },
            error: error => {
              this.alertService.showInfoMsg(error.message);
            }
          });

      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    });
  }



  openGroundRentBillModalComponent() {
    this.addGroundRentBillModalService.config.ignoreBackdropClick = true;
    this.addGroundRentBillModalService.config.animated = true;
    this.addGroundRentBillBsModalRef = this.addGroundRentBillModalService.show(AddRentalBillComponent);
    this.addGroundRentBillBsModalRef.content.closeBtnName = 'Close';
  }



  async logAction(msg: string, ui: string): Promise<void> {
    await this.accountService.logUserAudit(msg, ui);
  }
}
