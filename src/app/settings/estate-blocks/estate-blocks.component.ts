import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { Estate } from 'src/app/@models/settings/estate';
import { EstateBlock } from 'src/app/@models/settings/estate-block';
import { User } from 'src/app/@models/user';
import { EstateBlockListResponse } from 'src/app/@restmodels/settings/estate-block-list.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { SettingsService } from 'src/app/@services/settings.service';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { AddItemComponent } from 'src/app/@shared/components/add-item.component';
import { FullNameComponent } from 'src/app/@shared/components/full-name.component';
import { PageTitleComponent } from 'src/app/@shared/components/page-title.component';
import { ListFilterPipe } from 'src/app/@shared/pipes/list-filter.pipe';
import { TimeAgoPipe } from 'src/app/@shared/pipes/time-ago.pipe';
import { AddEstateBlockComponent } from './add-estate-block.component';
import { EstateListResponse } from 'src/app/@restmodels/settings/estate-list.response';
import { FormLabelComponent } from "../../@shared/components/form-label.component";
import { NgSelectModule } from '@ng-select/ng-select';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estate-blocks',
  standalone: true,
  templateUrl: './estate-blocks.component.html',
  imports: [ CommonModule, TableModule, FormsModule, NgSelectModule,
    FullNameComponent, AddItemComponent, PageTitleComponent,
    ListFilterPipe, TimeAgoPipe, FormLabelComponent ]
})
export class EstateBlocksComponent implements OnInit, OnDestroy {


  currentUser: User;
  estate: string = "A";
  listOfEstateBlocks: EstateBlock[];
  listOfEstates: Estate[];
  searchedKeyword: string;

  constructor(
    public addEstateBlockBsModalRef: BsModalRef,
    private addEstateModalService: BsModalService,
    private accountService: AuthService,
    private settingsService: SettingsService,
    private alertService: AlertService,
    private logger: NGXLogger,

  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.estate = localStorage.getItem("estate") ?? 'A';
    this.fetchEstates();

    if (this.estate !== "A") {
      this.fetchEstateBlocks();
    }
  }
  ngOnDestroy(): void {
    this.addEstateModalService.hide();
    Swal.close();
  }

  refreshButton() {
    this.fetchEstateBlocks();
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
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }


  openEstateModalComponent(estateBlock: EstateBlock, isAddMode: boolean) {
    const initialState: ModalOptions = {
      initialState: {
        isAddMode,
        estateBlock
      }
    };
    this.addEstateModalService.config.ignoreBackdropClick = true;
    this.addEstateModalService.config.animated = true;
    this.addEstateBlockBsModalRef = this.addEstateModalService.show(AddEstateBlockComponent, initialState);
    this.addEstateBlockBsModalRef.content.closeBtnName = 'Close';
  }
}
