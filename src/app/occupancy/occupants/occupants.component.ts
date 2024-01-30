import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { Occupant } from 'src/app/@models/occupancy/occupant';
import { User } from 'src/app/@models/user';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { OccupancyService } from 'src/app/@services/occupancy.service';
import Swal from 'sweetalert2';
import { OccupantListResponse } from 'src/app/@restmodels/occupancy/occupant-list.response';
import { UtilsService } from 'src/app/@services/utils.service';
import { PageTitleComponent } from "../../@shared/components/page-title.component";
import { FormLabelComponent } from "../../@shared/components/form-label.component";
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { AddItemComponent } from "../../@shared/components/add-item.component";
import { TableModule } from 'primeng/table';
import { ListFilterPipe } from 'src/app/@shared/pipes/list-filter.pipe';
import { AddIndividualOccupantComponent } from './add-individual-occupant.component';
import { AddInstitutionOccupantComponent } from './add-institution-occupant.component';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { ViewOccupantDetailsComponent } from './view-occupant-details.component';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { FullNameComponent } from "../../@shared/components/full-name.component";
import { OccupantListRequest } from 'src/app/@restmodels/occupancy/occupant-list.request';
import { CleanDatePipe } from "../../@shared/pipes/clean-date.pipe";

@Component({
    standalone: true,
    templateUrl: './occupants.component.html',
    imports: [CommonModule, PageTitleComponent, FormLabelComponent,
        FormsModule, CalendarModule, AddItemComponent, TableModule, ListFilterPipe, FullNameComponent, CleanDatePipe]
})
export class OccupantsComponent implements OnInit, OnDestroy {

  currentUser: User;
  listOfOccupants: Occupant[];
  searchedKeyword: string;
  bsModalRef?: BsModalRef;
  isAddMode: boolean;
  startDate: Date;
  endDate: Date;
  occupantType: string;

  constructor(
    private accountService: AuthService,
    private occupantsService: OccupancyService,
    private alertService: AlertService,
    private utilsService: UtilsService,
    private logger: NGXLogger,
    public addIndividualOccupantBsModalRef: BsModalRef,
    public addInstitutionOccupantBsModalRef: BsModalRef,
    public viewOccupantBsModalRef: BsModalRef,
    private individualOccupantModalService: BsModalService,
    private institutionOccupantModalService: BsModalService,
    private viewOccupantModalService: BsModalService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.occupantType = "ALL";
    this.startDate = this.utilsService.getFirstDayOfCurrentYear();
    this.endDate = new Date();
    this.prefetchOccupants();
  }
  
  ngOnDestroy(): void {
    this.individualOccupantModalService.hide();
    this.institutionOccupantModalService.hide();
    this.viewOccupantModalService.hide();
    Swal.close();
  }

  prefetchOccupants(): void {

    let request = new OccupantListRequest();
    request.dateRange = false;
    request.startDate = this.startDate;
    request.endDate = this.endDate;
    request.occupantType = 'ALL';

    this.listOfOccupants = [];
    this.occupantsService.searchOccupants(this.currentUser, request).subscribe({
      next: (res: OccupantListResponse) => {
        this.logger.info(`searchOccupants response ` + JSON.stringify(res));
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.occupants.length <= 0) {
          this.alertService.showInfoMsgGeneral("No occupants found");
          this.logger.info("No occupants found");
          return;
        }
        this.listOfOccupants = res.occupants;
      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }

  fetchOccupants(): void {

    let request = new OccupantListRequest();
    request.dateRange = true;
    request.startDate = this.startDate;
    request.endDate = this.endDate;
    request.occupantType = this.occupantType;

    this.listOfOccupants = [];
    this.occupantsService.searchOccupants(this.currentUser, request).subscribe({
      next: (res: OccupantListResponse) => {
        this.logger.info(`searchOccupants response ` + JSON.stringify(res));
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.occupants.length <= 0) {
          this.alertService.showInfoMsgGeneral("No occupants found");
          this.logger.info("No occupants found");
          return;
        }
        this.listOfOccupants = res.occupants;
      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
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
        this.occupantsService.deleteOccupant(this.currentUser, occupant.recordId)
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





  openIndividualModalComponent(occupant: Occupant, isAddMode: boolean) {
    const initialState: ModalOptions = {
      initialState: {
        isAddMode,
        occupant
      }
    };
    this.individualOccupantModalService.config.ignoreBackdropClick = true;
    this.individualOccupantModalService.config.animated = true;
    this.addIndividualOccupantBsModalRef = this.individualOccupantModalService.show(AddIndividualOccupantComponent, initialState);
    this.addIndividualOccupantBsModalRef.content.closeBtnName = 'Close';
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

  openViewOccupantModalComponent(occupant: Occupant) {
    const initialState: ModalOptions = {
      initialState: {
        occupant
      }
    };
    this.viewOccupantModalService.config.ignoreBackdropClick = true;
    this.viewOccupantModalService.config.animated = true;
    this.viewOccupantBsModalRef = this.viewOccupantModalService.show(ViewOccupantDetailsComponent, initialState);
    this.viewOccupantBsModalRef.content.closeBtnName = 'Close';
  }



  async logAction(msg: string, ui: string): Promise<void> {
    await this.accountService.logUserAudit(msg, ui);
  }
}
