import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { TableModule } from 'primeng/table';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { User } from 'src/app/@models/user';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { SettingsService } from 'src/app/@services/settings.service';
import { AddItemComponent } from 'src/app/@shared/components/add-item.component';
import { FullNameComponent } from 'src/app/@shared/components/full-name.component';
import { PageTitleComponent } from 'src/app/@shared/components/page-title.component';
import { ListFilterPipe } from 'src/app/@shared/pipes/list-filter.pipe';
import { TimeAgoPipe } from 'src/app/@shared/pipes/time-ago.pipe';
import Swal from 'sweetalert2';
import { PropertyCharge } from 'src/app/@models/estate-billing/property-charge';
import { PropertyChargeListResponse } from 'src/app/@restmodels/estate-billing/property-charge-list.response';
import { PropertyChargeService } from 'src/app/@services/property-charge.service ';
import { AddPropertyChargeComponent } from './add-property-charge.component';
import { FormLabelComponent } from "../../@shared/components/form-label.component";
import { NgSelectModule } from '@ng-select/ng-select';
import { Region } from 'src/app/@models/settings/region';
import { RegionListResponse } from 'src/app/@restmodels/settings/region-list.response';
import { UtilsService } from 'src/app/@services/utils.service';
import { PropertyChargeDetailsComponent } from './property-charge-details.component';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { RemoveHyphenPipe } from "../../@shared/pipes/remove-hyphen.pipe";

@Component({
    standalone: true,
    templateUrl: './property-charge-list.component.html',
    imports: [CommonModule, TableModule, FormsModule, NgSelectModule,
        FullNameComponent, AddItemComponent, PageTitleComponent,
        ListFilterPipe, TimeAgoPipe, FormLabelComponent, RemoveHyphenPipe]
})
export class PropertyChargeListComponent implements OnInit, OnDestroy {


  currentUser: User;
  listOfPropertyCharges: PropertyCharge[];
  searchedKeyword: string;
  bsModalRef?: BsModalRef;
  isAddMode: boolean;
  addPropertyChargeBsModalRef?: BsModalRef;
  regionId: string;
  chargeYear: number;
  listOfRegions: Region[];
  listOfChargeYears: any[];

  addPropertyChargeDetailsBsModalRef?: BsModalRef;

  constructor(
    private utilsService: UtilsService,
    private accountService: AuthService,
    private alertService: AlertService,
    private settingService: SettingsService,
    private logger: NGXLogger,
    private propertyChargeService: PropertyChargeService,
    private propertyChargeModalService: BsModalService,
    private propertyChargeDetailsModalService: BsModalService

  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.logAction("Viewed property charges page", PortalMenus.ESTATE_BILLING);
    this.regionId = this.currentUser.regionId;
    this.chargeYear = new Date().getFullYear();
    this.listOfChargeYears = this.utilsService.getChargeYears();
    this.fetchRegions();
    this.refreshButton();
  }

  ngOnDestroy(): void {
    this.propertyChargeModalService.hide();
    Swal.close();
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
    this.propertyChargeService.getPropertyCharges(this.currentUser, this.regionId, this.chargeYear).subscribe({
      next: (res: PropertyChargeListResponse) => {
        this.logger.info(`getPropertyCharges response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.propertyCharges.length <= 0) {
          this.alertService.showInfoMsgGeneral("No property charges found");
          this.logger.info("No property charges found");
          return;
        }
        this.listOfPropertyCharges = res.propertyCharges;
      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }

  openPropertyChargeModalComponent(propertyCharge: PropertyCharge, isAddMode: boolean) {
    const initialState: ModalOptions = {
      initialState: {
        isAddMode,
        propertyCharge
      }
    };
    this.propertyChargeModalService.config.ignoreBackdropClick = true;
    this.propertyChargeModalService.config.animated = true;
    this.addPropertyChargeBsModalRef = this.propertyChargeModalService.show(AddPropertyChargeComponent, initialState);
    this.addPropertyChargeBsModalRef.content.closeBtnName = 'Close';
  }

  openChargeDetailsModalComponent(propertyCharge: PropertyCharge) {
    const initialState: ModalOptions = {
      initialState: {
        propertyCharge
      }
    };
    this.propertyChargeDetailsModalService.config.ignoreBackdropClick = true;
    this.propertyChargeDetailsModalService.config.animated = true;
    this.addPropertyChargeDetailsBsModalRef = this.propertyChargeDetailsModalService.show(PropertyChargeDetailsComponent, initialState);
    this.addPropertyChargeDetailsBsModalRef.content.closeBtnName = 'Close';
  }






  openDeleteChargeModalComponent(propertyCharge: PropertyCharge) {

    let propertyUsage = propertyCharge.propertyUsage.toLowerCase();

    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `Do you want to delete charge of ${propertyUsage} for ${propertyCharge.chargeYear}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.value) {
        this.propertyChargeService.deletePropertyCharge(this.currentUser, propertyCharge.recordId)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('delete Occupant response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(res.headerResponse.responseMessage);
              this.propertyChargeModalService.hide();
              this.logAction(`Deleted property charge  of ${propertyUsage} for ${propertyCharge.chargeYear}`, PortalMenus.ESTATE_BILLING);
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
