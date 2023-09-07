import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { User } from 'src/app/@models/user';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { SettingsService } from 'src/app/@services/settings.service';
import Swal from 'sweetalert2';
import { AddItemComponent } from "../../@shared/components/add-item.component";
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FullNameComponent } from 'src/app/@shared/components/full-name.component';
import { PageTitleComponent } from 'src/app/@shared/components/page-title.component';
import { ListFilterPipe } from 'src/app/@shared/pipes/list-filter.pipe';
import { TimeAgoPipe } from 'src/app/@shared/pipes/time-ago.pipe';
import { Region } from 'src/app/@models/settings/region';
import { RegionListResponse } from 'src/app/@restmodels/settings/region-list.response';
import { AddRegionComponent } from './add-region.component';
import { RemoveHyphenPipe } from "../../@shared/pipes/remove-hyphen.pipe";

@Component({
    standalone: true,
    templateUrl: './regions.component.html',
    imports: [CommonModule, TableModule, FormsModule,
        FullNameComponent, AddItemComponent, PageTitleComponent,
        ListFilterPipe, TimeAgoPipe, RemoveHyphenPipe]
})
export class RegionsComponent implements OnInit, OnDestroy {

  currentUser: User;
  listOfRegions: Region[];
  searchedKeyword: string;
  bsModalRef?: BsModalRef;
  isAddMode: boolean;
  addRegionBsModalRef?: BsModalRef;

  constructor(
    private accountService: AuthService,
    private alertService: AlertService,
    private logger: NGXLogger,
    private settings: SettingsService,
    private regionModalService: BsModalService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.refreshButton();
    this.logAction("Viewed regions page", PortalMenus.SETTINGS);
  }

  ngOnDestroy(): void {
    this.regionModalService.hide();
    Swal.close();
  }

  refreshButton() {
    this.fetchRegions();
  }

  fetchRegions(): void {
    this.listOfRegions = [];
    this.settings.getRegions().subscribe({
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

  openRegionModalComponent(region: Region, isAddMode: boolean) {
    const initialState: ModalOptions = {
      initialState: {
        isAddMode,
        region
      }
    };
    this.regionModalService.config.ignoreBackdropClick = true;
    this.regionModalService.config.animated = true;
    this.addRegionBsModalRef = this.regionModalService.show(AddRegionComponent, initialState);
    this.addRegionBsModalRef.content.closeBtnName = 'Close';
  }

  async logAction(msg: string, ui: string): Promise<void> {
    await this.accountService.logUserAudit(msg, ui);
  }
}
