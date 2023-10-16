import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { TableModule } from 'primeng/table';
import { Estate } from 'src/app/@models/settings/estate';
import { EstateBlock } from 'src/app/@models/settings/estate-block';
import { User } from 'src/app/@models/user';
import { EstateBlockListResponse } from 'src/app/@restmodels/settings/estate-block-list.response';
import { EstateListResponse } from 'src/app/@restmodels/settings/estate-list.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { SettingsService } from 'src/app/@services/settings.service';
import { AddItemComponent } from 'src/app/@shared/components/add-item.component';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { FullNameComponent } from 'src/app/@shared/components/full-name.component';
import { PageTitleComponent } from 'src/app/@shared/components/page-title.component';
import { ListFilterPipe } from 'src/app/@shared/pipes/list-filter.pipe';
import { TimeAgoPipe } from 'src/app/@shared/pipes/time-ago.pipe';
import Swal from 'sweetalert2';
import { AddEstateBlockComponent } from '../estate-blocks/add-estate-block.component';
import { EstateProperty } from 'src/app/@models/settings/estate-property';
import { EstatePropertyListResponse } from 'src/app/@restmodels/settings/estate-property-list.response';
import { AddEstatePropertyComponent } from './add-estate-property.component';
import { RemoveHyphenPipe } from "../../@shared/pipes/remove-hyphen.pipe";

@Component({
  selector: 'app-estate-properties',
  standalone: true,
  templateUrl: './estate-properties.component.html',
  imports: [ CommonModule, TableModule, FormsModule, NgSelectModule,
    FullNameComponent, AddItemComponent, PageTitleComponent,
    ListFilterPipe, TimeAgoPipe, FormLabelComponent, RemoveHyphenPipe ]
})
export class EstatePropertiesComponent implements OnInit, OnDestroy {



  currentUser: User;
  estate: string;
  block: string;
  listOfEstateBlocks: EstateBlock[];
  listOfEstates: Estate[];
  listOfProperties: EstateProperty[];

  searchedKeyword: string;
  searchParameter: string;
  searchValue: string;
  searchBy: string;
  searchParameterLabel: string;

  constructor(
    public addPropertyBsModalRef: BsModalRef,
    private addPropertyModalService: BsModalService,
    private accountService: AuthService,
    private settingsService: SettingsService,
    private alertService: AlertService,
    private logger: NGXLogger,

  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.estate = "A";
    this.block = "A";
    this.searchParameter = "PROP";
    this.searchBy == "PNAM";
    // this.searchByListener();
    this.searchParameterListener();

  }
  ngOnDestroy(): void {
    this.addPropertyModalService.hide();
    Swal.close();
  }

  refreshButton() {
    this.fetchEstateProperties();
  }

  searchByListener(): void {
    if (this.searchParameter == "BAB") {
      this.estate = "A";
      this.block = "A";
      this.fetchEstates();
      this.listOfEstateBlocks = [];
    }
    this.listOfProperties = [];
  }

  searchParameterListener(): void {
    this.searchValue = '';
    if (this.searchBy == "PNAM") {
      this.searchParameterLabel = "Property Name";
      return;
    }
    if (this.searchBy == "PNUM") {
      this.searchParameterLabel = "Property Number"
    }
   
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
    this.block = "A";
    this.listOfEstateBlocks = [];
    this.settingsService.getEstateBlocks(this.currentUser, this.estate).subscribe({
      next: (res: EstateBlockListResponse) => {
        this.logger.info(`getEstates response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.estateBlocks.length <= 0) {
          this.block = "No blocks found";
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

  fetchEstateProperties(): void {
    this.listOfProperties = [];


    if (this.searchParameter == "BAB") {
      this.searchValue = this.block;
      this.searchBy = "BAB";
    }
    // else {
    //   this.searchParameter = this.searchBy;
    // }
    

    this.settingsService.getProperties(this.currentUser, this.searchBy, this.searchValue).subscribe({
      next: (res: EstatePropertyListResponse) => {
        this.logger.info(`getEstateProperties response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.properties.length <= 0) {
          this.alertService.showInfoMsgGeneral("No properties found");
          this.logger.info("No properties found ");
          return;
        }
        this.listOfProperties = res.properties;
      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }


  openEstateModalComponent(estateProperty: EstateProperty, isAddMode: boolean) {
    const initialState: ModalOptions = {
      initialState: {
        isAddMode,
        estateProperty
      }
    };
    this.addPropertyModalService.config.ignoreBackdropClick = true;
    this.addPropertyModalService.config.animated = true;
    this.addPropertyBsModalRef = this.addPropertyModalService.show(AddEstatePropertyComponent, initialState);
    this.addPropertyBsModalRef.content.closeBtnName = 'Close';
  }
}
