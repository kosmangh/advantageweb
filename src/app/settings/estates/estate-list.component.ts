import { SelectedEstateBlocksComponent } from './selected-estate-blocks.component';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { Estate } from 'src/app/@models/settings/estate';
import { User } from 'src/app/@models/user';
import { EstateListResponse } from 'src/app/@restmodels/settings/estate-list.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import Swal from 'sweetalert2';
import { AddEstateComponent } from './add-estate.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { AddItemComponent } from 'src/app/@shared/components/add-item.component';
import { FullNameComponent } from 'src/app/@shared/components/full-name.component';
import { PageTitleComponent } from 'src/app/@shared/components/page-title.component';
import { ListFilterPipe } from 'src/app/@shared/pipes/list-filter.pipe';
import { TimeAgoPipe } from 'src/app/@shared/pipes/time-ago.pipe';
import { EstateDetailsComponent } from './estate-details.component';
import { SelectedEstatePropertiesComponent } from './selected-estate-properties.component';
import { EstateService } from 'src/app/@services/estate.service';
import { RemoveHyphenPipe } from "../../@shared/pipes/remove-hyphen.pipe";
import { CleanDatePipe } from "../../@shared/pipes/clean-date.pipe";

@Component({
    selector: 'app-estate-list',
    standalone: true,
    templateUrl: './estate-list.component.html',
    imports: [CommonModule, TableModule, FormsModule,
        FullNameComponent, AddItemComponent, PageTitleComponent,
        ListFilterPipe, TimeAgoPipe, RemoveHyphenPipe, CleanDatePipe]
})
export class EstateListComponent implements OnInit, OnDestroy {

  currentUser: User;
  listOfEstates: Estate[];
  searchedKeyword: string;
  bsModalRef?: BsModalRef;
  isAddMode: boolean;

  addEstateBsModalRef?: BsModalRef;
  viewEstateBlockBsModalRef?: BsModalRef;
  viewEstatePropertyBsModalRef?: BsModalRef;

  searchBy: string;
  searchValue: string;


  constructor(
    private estateService: EstateService,
    private alertService: AlertService,
    private accountService: AuthService,
    private logger: NGXLogger,
    private estateModalService: BsModalService,
    private estateBlockModalService: BsModalService,
    private estatePropertyModalService: BsModalService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.searchBy = "ALL";
    this.refreshButton();
    this.logAction("Viewed estates page", PortalMenus.SETTINGS);
  }

  ngOnDestroy(): void {
    this.estateModalService.hide();
    Swal.close();
  }

  refreshButton() {
    this.fetchEstates();
  }

  fetchEstates(): void {
    this.listOfEstates = [];
    this.estateService.getEstates(this.currentUser, this.searchBy, this.searchValue).subscribe({
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

  openEstateModalComponent(estate: Estate, isAddMode: boolean) {
    const initialState: ModalOptions = {
      initialState: {
        isAddMode,
        estate
      }
    };
    this.estateModalService.config.ignoreBackdropClick = true;
    this.estateModalService.config.animated = true;
    this.addEstateBsModalRef = this.estateModalService.show(AddEstateComponent, initialState);
    this.addEstateBsModalRef.content.closeBtnName = 'Close';
  }

  openEstateDetailsModalComponent(estate: Estate) {
    const initialState: ModalOptions = {
      initialState: {
        estate
      }
    };
    this.estateModalService.config.ignoreBackdropClick = false;
    this.estateModalService.config.animated = true;
    this.addEstateBsModalRef = this.estateModalService.show(EstateDetailsComponent, initialState);
    this.addEstateBsModalRef.content.closeBtnName = 'Close';
  }

  openEstateBlocksModalComponent(estate: Estate) {
    const initialState: ModalOptions = {
      initialState: {
        estate
      }
    };
    this.estateBlockModalService.config.ignoreBackdropClick = false;
    this.estateBlockModalService.config.animated = true;
    this.viewEstateBlockBsModalRef = this.estateModalService.show(SelectedEstateBlocksComponent, initialState);
    this.viewEstateBlockBsModalRef.content.closeBtnName = 'Close';
  }

  openEstatePropertiesModalComponent(estate: Estate) {
    const initialState: ModalOptions = {
      initialState: {
        estate
      }
    };
    this.estatePropertyModalService.config.ignoreBackdropClick = false;
    this.estatePropertyModalService.config.animated = true;
    this.viewEstatePropertyBsModalRef = this.estateModalService.show(SelectedEstatePropertiesComponent, initialState);
    this.viewEstatePropertyBsModalRef.content.closeBtnName = 'Close';
  }

  async logAction(msg: string, ui: string): Promise<void> {
    await this.accountService.logUserAudit(msg, ui);
  }
}
