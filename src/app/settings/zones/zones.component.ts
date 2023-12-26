import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { PageTitleComponent } from 'src/app/@shared/components/page-title.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Zone } from 'src/app/@models/settings/zone';
import { User } from 'src/app/@models/user';
import { NGXLogger } from 'ngx-logger';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { SettingsService } from 'src/app/@services/settings.service';
import Swal from 'sweetalert2';
import { ZoneListResponse } from 'src/app/@restmodels/settings/zone-list.response';
import { TableModule } from 'primeng/table';
import { FullNameComponent } from "../../@shared/components/full-name.component";
import { AddItemComponent } from "../../@shared/components/add-item.component";
import { AddZoneComponent } from './add-zone.component';
import { ListFilterPipe } from 'src/app/@shared/pipes/list-filter.pipe';
import { TimeAgoPipe } from "../../@shared/pipes/time-ago.pipe";
import { CleanDatePipe } from "../../@shared/pipes/clean-date.pipe";
import { NgbAlertModule, NgbDateStruct, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-manage-customers',
    standalone: true,
    templateUrl: './zones.component.html',
  imports: [ CommonModule, TableModule, FormsModule, NgbDatepickerModule, JsonPipe, NgbAlertModule,
    FullNameComponent, AddItemComponent, PageTitleComponent, ReactiveFormsModule,
        ListFilterPipe, TimeAgoPipe, CleanDatePipe]
})
export class ZonesComponent implements OnInit, OnDestroy {

  currentUser: User;
  listOfZones: Zone[];
  searchedKeyword: string;
  bsModalRef?: BsModalRef;
  isAddMode: boolean;
  addZoneBsModalRef?: BsModalRef;

  model: NgbDateStruct;

  formGroup = new FormGroup({});
  constructor(
    private accountService: AuthService,
    private alertService: AlertService,
    private logger: NGXLogger,
    private settings: SettingsService,
    private zoneModalService: BsModalService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.formGroup.addControl("test", new FormControl({ day: 20, month: 4, year: 1969 })) //nice
    this.formGroup.valueChanges.subscribe(val => {
      console.log(val);
    })
    console.log('Date is ' + this.formGroup.value);
    this.refreshButton();
    this.logAction("Viewed zones page", PortalMenus.SETTINGS);
  }

  ngOnDestroy(): void {
    this.zoneModalService.hide();
    Swal.close();
  }

  refreshButton() {
    this.fetchZones();
  }

  fetchZones(): void {
    this.listOfZones = [];
    this.settings.getZones().subscribe({
      next: (res: ZoneListResponse) => {
        this.logger.info(`getZones response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.zones.length <= 0) {
          this.alertService.showInfoMsgGeneral("No zones found");
          this.logger.info("No zones found");
          return;
        }
        this.listOfZones = res.zones;
      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }

  openZoneModalComponent(zone: Zone, isAddMode: boolean) {
    const initialState: ModalOptions = {
      initialState: {
        isAddMode,
        zone
      }
    };
    this.zoneModalService.config.ignoreBackdropClick = true;
    this.zoneModalService.config.animated = true;
    this.addZoneBsModalRef = this.zoneModalService.show(AddZoneComponent, initialState);
    this.addZoneBsModalRef.content.closeBtnName = 'Close';
  }

  async logAction(msg: string, ui: string): Promise<void> {
    await this.accountService.logUserAudit(msg, ui);
  }




}
