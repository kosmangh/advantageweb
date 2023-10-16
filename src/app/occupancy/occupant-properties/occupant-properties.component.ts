import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { Occupant } from 'src/app/@models/occupancy/occupant';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { User } from 'src/app/@models/user';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { OccupancyService } from 'src/app/@services/occupancy.service';
import { UtilsService } from 'src/app/@services/utils.service';
import Swal from 'sweetalert2';
import { AddInstitutionOccupantComponent } from '../occupants/add-institution-occupant.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { AddItemComponent } from 'src/app/@shared/components/add-item.component';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { PageTitleComponent } from 'src/app/@shared/components/page-title.component';
import { ListFilterPipe } from 'src/app/@shared/pipes/list-filter.pipe';
import { Estate } from 'src/app/@models/settings/estate';
import { EstateBlock } from 'src/app/@models/settings/estate-block';
import { EstateBlockListResponse } from 'src/app/@restmodels/settings/estate-block-list.response';
import { EstateListResponse } from 'src/app/@restmodels/settings/estate-list.response';
import { SettingsService } from 'src/app/@services/settings.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddOccupantPropertyComponent } from './add-occupant-property.component';
import { OccupantProperty } from 'src/app/@models/occupancy/occupant-property';
import { OccupantPropertyListResponse } from 'src/app/@restmodels/occupancy/occupant-property-list.response';
import { OccupantPropertyListRequest } from 'src/app/@restmodels/occupancy/occupant-property-list.request';
import { ViewOccupantPropertyComponent } from './view-occupant-property.component';
import { ExcelExporterService } from 'src/app/@services/excel-exporter.service';
import { FullNameComponent } from "../../@shared/components/full-name.component";
import { RemoveHyphenPipe } from "../../@shared/pipes/remove-hyphen.pipe";
import { CleanDatePipe } from "../../@shared/pipes/clean-date.pipe";

@Component({
    standalone: true,
    templateUrl: './occupant-properties.component.html',
    imports: [CommonModule, PageTitleComponent, FormLabelComponent, NgSelectModule,
        FormsModule, CalendarModule, AddItemComponent, TableModule, ListFilterPipe, FullNameComponent, RemoveHyphenPipe, CleanDatePipe]
})
export class OccupantPropertyComponent implements OnInit, OnDestroy {

  currentUser: User;
  listOfOccupantProperties: OccupantProperty[];
  searchedKeyword: string;
  bsModalRef?: BsModalRef;
  isAddMode: boolean;
  startDate: Date;
  endDate: Date;

  searchBy: string;
  searchParameter: string = "NAM";
  searchParameterLabel: string;
  searchValue: string;
  estate: string;
  block: string;
  showOccupantSearchBy: boolean = true;
  listOfEstateBlocks: EstateBlock[];
  listOfEstates: Estate[];

  settingsService = inject(SettingsService);
  excelExporterService = inject(ExcelExporterService);
  accountService = inject(AuthService);
  alertService = inject(AlertService);
  utilsService = inject(UtilsService);
  occupantsService = inject(OccupancyService);
  constructor(
    private logger: NGXLogger,
    public addOccupantPropertyBsModalRef: BsModalRef,
    public addInstitutionOccupantBsModalRef: BsModalRef,
    public viewOccupantPropertyBsModalRef: BsModalRef,
    private addOccupantPropertyModalService: BsModalService,
    private institutionOccupantModalService: BsModalService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.searchBy = "OCC";
    this.searchParameter == "NAM";
    this.startDate = this.utilsService.getFirstDayDate();
    this.endDate = new Date();
    this.searchParameterListener();
  }
  ngOnDestroy(): void {
    this.addOccupantPropertyModalService.hide();
    Swal.close();
  }

  searchByListener(): void {
    if (this.searchBy == "BAB") {
      this.estate = "A";
      this.block = "A";
      this.fetchEstates();
      this.listOfEstateBlocks = [];
    }
    this.listOfOccupantProperties = [];
  }
  searchParameterListener(): void {
    if (this.searchParameter == "MOB") {
      this.searchParameterLabel = "Mobile Number"
      return;
    }
    if (this.searchParameter == "NAM") {
      this.searchParameterLabel = "Occupant Name";
      return;
    }
    if (this.searchParameter == "EMAIL") {
      this.searchParameterLabel = "Email Address";
      return;
    }
  }

  fetchOccupantProperties(): void {
    this.listOfOccupantProperties = [];
    const request = new OccupantPropertyListRequest();

    request.block = "";
    request.searchBy = this.searchBy;
    request.searchParameter = this.searchParameter;
    request.searchValue = this.searchValue;
    if (this.searchBy == "BAB") {
      request.searchValue = "";
      request.block = this.block;
      request.searchParameter = "";
      request.searchValue = "";
    }



    this.occupantsService.searchOccupantProperties(this.currentUser, request).subscribe({
      next: (res: OccupantPropertyListResponse) => {
        this.logger.info(`searchOccupants response ` + JSON.stringify(res));
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.occupantProperties.length <= 0) {
          this.alertService.showInfoMsgGeneral("No occupant properties found");
          this.logger.info("No occupant properties found");
          return;
        }
        this.listOfOccupantProperties = res.occupantProperties;
      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }
  
  export(): void {
    // let Heading = [ [ 'brandId', 'Contact', 'City', 'Location', 'Digital Address', 'Created By', 'Created Date', 'Last Modified By', 'Last Modified Date' ] ];
    this.excelExporterService.exportAsExcelFile(this.listOfOccupantProperties, "occupantProperties");
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

  fetchEstateBlocks(): void {
    this.listOfEstateBlocks = [];
    this.settingsService.getEstateBlocks(this.currentUser, this.estate).subscribe({
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

  deleteOccupant(occupant: Occupant): void {
    let occupantName = occupant.occupantName;

    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `Do you want to delete ${occupantName}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.value) {
        this.occupantsService.deleteOccupantProperty(this.currentUser, occupant.recordId)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('deleteOccupant response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${occupantName} deleted successfully`);
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





  openOccupantPropertyModalComponent(occupantProperty: OccupantProperty, isAddMode: boolean) {
    const initialState: ModalOptions = {
      initialState: {
        isAddMode,
        occupantProperty
      }
    };
    this.addOccupantPropertyModalService.config.ignoreBackdropClick = true;
    this.addOccupantPropertyModalService.config.animated = true;
    this.addOccupantPropertyBsModalRef = this.addOccupantPropertyModalService.show(AddOccupantPropertyComponent, initialState);
    this.addOccupantPropertyBsModalRef.content.closeBtnName = 'Close';
  }

  openInstitutionModalComponent(occupant: Occupant, isAddMode: boolean) {
    const initialState: ModalOptions = {
      initialState: {
        isAddMode,
        occupant
      }
    };
    this.institutionOccupantModalService.config.ignoreBackdropClick = true;
    this.institutionOccupantModalService.config.animated = true;
    this.addInstitutionOccupantBsModalRef = this.institutionOccupantModalService.show(AddInstitutionOccupantComponent, initialState);
    this.addInstitutionOccupantBsModalRef.content.closeBtnName = 'Close';
  }

  openViewOccupantModalComponent(occupantProperty: OccupantProperty) {
    const initialState: ModalOptions = {
      initialState: {
        occupantProperty
      }
    };
    this.institutionOccupantModalService.config.ignoreBackdropClick = true;
    this.institutionOccupantModalService.config.animated = true;
    this.viewOccupantPropertyBsModalRef = this.institutionOccupantModalService.show(ViewOccupantPropertyComponent, initialState);
    this.viewOccupantPropertyBsModalRef.content.closeBtnName = 'Close';
  }



  async logAction(msg: string, ui: string): Promise<void> {
    await this.accountService.logUserAudit(msg, ui);
  }
}
