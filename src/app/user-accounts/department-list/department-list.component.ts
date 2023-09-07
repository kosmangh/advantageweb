import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { User } from 'src/app/@models/user';
import { Department } from 'src/app/@models/user-accounts/department';
import { DepartmentListResponse } from 'src/app/@restmodels/user-accounts/department-list.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import Swal from 'sweetalert2';
import { AddDepartmentComponent } from './add-department.component';
import { TimeAgoPipe } from "../../@shared/pipes/time-ago.pipe";
import { FullNameComponent } from "../../@shared/components/full-name.component";
import { AddItemComponent } from "../../@shared/components/add-item.component";
import { ListFilterPipe } from 'src/app/@shared/pipes/list-filter.pipe';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { UserAccountService } from 'src/app/@services/user-account.service';

@Component({
    selector: 'app-department-list',
    standalone: true,
    templateUrl: './department-list.component.html',
  imports: [ CommonModule, TimeAgoPipe, FullNameComponent, AddItemComponent, ListFilterPipe, TableModule,FormsModule ]
})
export class DepartmentListComponent implements OnInit, OnDestroy {

  currentUser: User;
  listOfDepartments: Department[];
  searchedKeyword: string;
  bsModalRef?: BsModalRef;
  isAddMode: boolean;
  addDepartmentBsModalRef?: BsModalRef;

  private userAccountService = inject(UserAccountService);
  private alertService = inject(AlertService);
  private logger = inject(NGXLogger);

  constructor(
    private accountService: AuthService,
    private departmentModalService: BsModalService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.refreshButton();
    this.logAction("Viewed departments page", PortalMenus.SETTINGS);
  }

  ngOnDestroy(): void {
    this.departmentModalService.hide();
    Swal.close();
  }

  refreshButton() {
    this.fetchDepartments();
  }

  fetchDepartments(): void {
    this.listOfDepartments = [];
    this.userAccountService.getDepartments().subscribe({ next: (res: DepartmentListResponse) => {
        this.logger.info(`getDepartments response ` + JSON.stringify(res))
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.error(res.headerResponse.responseMessage);
          return;
        }
        if (res.departments.length <= 0) {
          this.alertService.showInfoMsgGeneral("No departments found");
          this.logger.info("No departments found");
          return;
        }
        this.listOfDepartments = res.departments;
      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }

  openDepartmentModalComponent(department: Department, isAddMode: boolean) {
    const initialState: ModalOptions = {
      initialState: {
        isAddMode,
        department
      }
    };
    this.departmentModalService.config.ignoreBackdropClick = true;
    this.departmentModalService.config.animated = true;
    this.addDepartmentBsModalRef = this.departmentModalService.show(AddDepartmentComponent, initialState);
    this.addDepartmentBsModalRef.content.closeBtnName = 'Close';
  }

  async logAction(msg: string, ui: string): Promise<void> {
    await this.accountService.logUserAudit(msg, ui);
  }
}
