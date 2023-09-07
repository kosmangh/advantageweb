import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Estate } from 'src/app/@models/settings/estate';
import { User } from 'src/app/@models/user';
import { AuthService } from 'src/app/@services/auth.service';
import { AvatarBgPipe } from 'src/app/@shared/pipes/avatar-bg.pipe';
import { AvatarNamePipe } from 'src/app/@shared/pipes/avatar-name.pipe';
import { TimeAgoPipe } from 'src/app/@shared/pipes/time-ago.pipe';
import { SettingsService } from 'src/app/@services/settings.service';
import { AlertService } from 'src/app/@services/alert.service';
import { NGXLogger } from 'ngx-logger';
import { EstateBlock } from 'src/app/@models/settings/estate-block';
import { EstateBlockListResponse } from 'src/app/@restmodels/settings/estate-block-list.response';
import { TableModule } from 'primeng/table';
import { FullNameComponent } from "../../@shared/components/full-name.component";
import { ListFilterPipe } from 'src/app/@shared/pipes/list-filter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  templateUrl: './selected-estate-blocks.component.html',
  imports: [ CommonModule, TableModule, FormsModule, ListFilterPipe, AvatarNamePipe, AvatarBgPipe, TimeAgoPipe, FullNameComponent ]
})
export class SelectedEstateBlocksComponent implements OnInit {

  currentUser: User;
  estate: Estate;
  listOfEstateBlocks: EstateBlock[];
  searchedKeyword: string;

  constructor(
    public viewEstateBlockBsModalRef: BsModalRef,
    private accountService: AuthService,
    private settingsService: SettingsService,
    private alertService: AlertService,
    private logger: NGXLogger,

  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.viewEstateBlockBsModalRef.setClass("gray modal-md modal-dialog-top");
    this.fetchEstates();
  }

  fetchEstates(): void {
    this.listOfEstateBlocks = [];
    this.settingsService.getEstateBlocks(this.currentUser, this.estate.recordId).subscribe({
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
}
