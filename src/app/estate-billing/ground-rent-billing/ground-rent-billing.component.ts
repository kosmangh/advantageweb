import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddItemComponent } from "../../@shared/components/add-item.component";
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { TableModule } from 'primeng/table';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { Region } from 'src/app/@models/settings/region';
import { User } from 'src/app/@models/user';
import { RegionListResponse } from 'src/app/@restmodels/settings/region-list.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { SettingsService } from 'src/app/@services/settings.service';
import { UtilsService } from 'src/app/@services/utils.service';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { FullNameComponent } from 'src/app/@shared/components/full-name.component';
import { PageTitleComponent } from 'src/app/@shared/components/page-title.component';
import { ListFilterPipe } from 'src/app/@shared/pipes/list-filter.pipe';
import { TimeAgoPipe } from 'src/app/@shared/pipes/time-ago.pipe';
import Swal from 'sweetalert2';
import { Estate } from 'src/app/@models/settings/estate';
import { EstateBlock } from 'src/app/@models/settings/estate-block';
import { EstateBlockListResponse } from 'src/app/@restmodels/settings/estate-block-list.response';
import { EstateListResponse } from 'src/app/@restmodels/settings/estate-list.response';
import { GroupRentBillingService } from 'src/app/@services/ground-rent-billing.service';
import { GroundRentalBillListResponse } from 'src/app/@restmodels/estate-billing/ground-rental-bill-list.response';
import { PropertyLedger } from 'src/app/@models/estate-billing/property-ledger';
import { RemoveHyphenPipe } from "../../@shared/pipes/remove-hyphen.pipe";
import { AddGroundBillComponent } from './add-ground-bill.component';

@Component({
    standalone: true,
    templateUrl: './ground-rent-billing.component.html',
    imports: [CommonModule, TableModule, FormsModule, NgSelectModule,
        FullNameComponent, AddItemComponent, PageTitleComponent,
        ListFilterPipe, TimeAgoPipe, FormLabelComponent, RemoveHyphenPipe]
})
export class GroundRentBillingComponent implements OnInit, OnDestroy {


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
  addPropertyChargeBsModalRef?: BsModalRef;

  addEstateBillingBsModalRef: BsModalRef;
  addBlockBillingBsModalRef: BsModalRef;
  addGroundRentBillBsModalRef: BsModalRef;
  estate: string;
  block: string;

  constructor(
    private groupRentBillingService: GroupRentBillingService,

    private utilsService: UtilsService,
    private accountService: AuthService,
    private alertService: AlertService,
    private settingService: SettingsService,
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
    this.listOfChargeYears = this.utilsService.getChargeYears();
    this.fetchEstates();
    // this.refreshButton();
  }

  ngOnDestroy(): void {
    this.addGroundRentBillModalService.hide();
    Swal.close();
  }

  fetchEstates(): void {
    this.listOfEstates = [];
    this.settingService.getEstates().subscribe({
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

  fetchEstateBlocks(): void {
    this.listOfEstateBlocks = [];
    this.settingService.getEstateBlocks(this.currentUser, this.estate).subscribe({
      next: (res: EstateBlockListResponse) => {
        this.logger.info(`getEstates response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.estateBlocks.length <= 0) {
          this.alertService.showInfoMsgGeneral("No blocks found");
          this.logger.info("No blocks found ");
          return;
        }
        this.listOfEstateBlocks = res.estateBlocks;
      },
      error: error => {
        this.logger.error(error.message);
        this.alertService.showInfoMsg(error.message);
      }
    });
  }


  fetchRegions(): void {
    this.listOfRegions = [];
    this.settingService.getRegions().subscribe({
      next: (res: RegionListResponse) => {
        this.logger.info(`getRegions response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.regions.length <= 0) {
          this.alertService.showInfoMsgGeneral("No regions found");
          this.logger.info("No regions found");
          return;
        }
        this.listOfRegions = res.regions;
      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }


  refreshButton() {
    this.fetchPropertyCharges();
  }

  fetchPropertyCharges(): void {
    this.listOfPropertyCharges = [];
    this.groupRentBillingService.getGroundRentBills (this.currentUser, this.block, this.chargeYear).subscribe({
      next: (res: GroundRentalBillListResponse) => {
        this.logger.info(`getGroundRentBills response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.propertyLedgers.length <= 0) {
          this.alertService.showInfoMsgGeneral("No ground rent bills found");
          this.logger.info("No ground rent bills found");
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


  openGroundRentBillModalComponent() {
    this.addGroundRentBillModalService.config.ignoreBackdropClick = true;
    this.addGroundRentBillModalService.config.animated = true;
    this.addGroundRentBillBsModalRef = this.addGroundRentBillModalService.show(AddGroundBillComponent);
    this.addGroundRentBillBsModalRef.content.closeBtnName = 'Close';
  }






 




  async logAction(msg: string, ui: string): Promise<void> {
    await this.accountService.logUserAudit(msg, ui);
  }

}
