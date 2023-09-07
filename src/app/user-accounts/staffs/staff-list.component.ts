import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { PortalMenus } from 'src/app/@models/portalMenus';
import { User } from 'src/app/@models/user';
import { GeneralResponse } from 'src/app/@restmodels/general.response';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { AddItemComponent } from 'src/app/@shared/components/add-item.component';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { PageTitleComponent } from 'src/app/@shared/components/page-title.component';
import { ListFilterPipe } from 'src/app/@shared/pipes/list-filter.pipe';
import Swal from 'sweetalert2';
import { AddStaffComponent } from './add-staff.component';
import { UserAccountService } from 'src/app/@services/user-account.service';
import { Staff } from 'src/app/@models/user-accounts/staff';
import { StaffListResponse } from 'src/app/@restmodels/user-accounts/staff-list.response';
import { FullNameComponent } from "../../@shared/components/full-name.component";
import { ViewStaffComponent } from './view-staff.component';
import { LoginAccountComponent } from './login-account.component';
import { TimeAgoPipe } from "../../@shared/pipes/time-ago.pipe";
import { RemoveHyphenPipe } from "../../@shared/pipes/remove-hyphen.pipe";
import { StaffService } from 'src/app/@services/staff.service';
import { LoginAccountRequest } from 'src/app/@restmodels/user-accounts/login-account.request';
import { UtilsService } from 'src/app/@services/utils.service';
import { AdminPasswordResetComponent } from './admin-password-reset.component';
import { StatusStylePipe } from "../../@shared/pipes/status-style.pipe";

@Component({
    standalone: true,
    templateUrl: './staff-list.component.html',
    imports: [CommonModule, PageTitleComponent, FormLabelComponent,
      FormsModule, CalendarModule, AddItemComponent, TableModule, ListFilterPipe,
      FullNameComponent, TimeAgoPipe, RemoveHyphenPipe, StatusStylePipe ]
})
export class StaffListComponent implements OnInit, OnDestroy {

  currentUser: User;
  listOfUsers: Staff[];
  searchedKeyword: string;
  bsModalRef?: BsModalRef;
  isAddMode: boolean;

  searchBy: string;
  searchValue: string;
  searchValueLabel: string;
  searchPlaceholder: string;

  private viewStaffModalService = inject(BsModalService);
  private addStaffModalService = inject(BsModalService);
  private loginAccountModalService = inject(BsModalService);
  private adminPasswordResetModalService = inject(BsModalService);
  private userAccountService = inject(UserAccountService);
  private accountService = inject(AuthService);
  private alertService = inject(AlertService);
  private staffService = inject(StaffService);
  private utilService = inject(UtilsService);
  private logger = inject(NGXLogger);
endDate: any;
startDate: any;

  constructor(
    public addStaffBsModalRef: BsModalRef,
    public viewStaffBsModalRef: BsModalRef,
    public loginAccountBsModalRef: BsModalRef,
    public adminPasswordResetBsModalRef: BsModalRef,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.searchBy = "ALL";
    this.fetchStaffs();
  }

  ngOnDestroy(): void {
    this.addStaffModalService.hide();
    this.viewStaffModalService.hide();
    this.loginAccountModalService.hide();
    Swal.close();
  }

  searchByListener() {

    // alert(this.searchBy);
    this.searchValue = '';
    if (this.searchBy === "lastName") {
      this.searchValueLabel = "Last Name";
      this.searchPlaceholder = " Enter last name";
      return;
    }
    if (this.searchBy === "username") {
      this.searchValueLabel = "Username";
      this.searchPlaceholder = " Enter username";
      return;
    }
    if (this.searchBy === "mobileNo") {
      this.searchValueLabel = "Mobile No";
      this.searchPlaceholder = " Enter mobile No";
      return;
    }
    if (this.searchBy === "email") {
      this.searchValueLabel = "Email Address";
      this.searchPlaceholder = " Enter email address";
      return;
    }
    if (this.searchBy === "ALL") {
      this.fetchStaffs();
    }
    
  }



  fetchStaffs(): void {

    this.listOfUsers = [];
    this.userAccountService.searchStaffs(this.currentUser, this.searchBy, this.searchValue).subscribe({
      next: (res: StaffListResponse) => {
        this.logger.info(`searchStaffs response ` + JSON.stringify(res));
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.showErrorMsg(res.headerResponse.responseMessage);
          return;
        }
        if (res.staffs.length <= 0) {
          this.alertService.showInfoMsgGeneral("No staffs found");
          this.logger.info("No staffs found");
          return;
        }
        this.listOfUsers = res.staffs;
      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }

  activateDeactivateAccount(staff: Staff, activated: boolean): void {
    let staffName = staff.fullName;
    let request = new LoginAccountRequest();

    let msg = "", logMsg = "";
    
    if (activated) {
      request.status = "ACTIVE";
      msg = `Do you want to activate account of ${staffName}?`;
      logMsg = `Activated account of ${ staffName }`;
    } else {
      request.status = "INACTIVE";
      msg = `Do you want to deactivate account of ${staffName}?`;
      logMsg = `Deactivated account of ${staffName}`;
    }

    request.createdBy = staff.username;
    request.password = this.utilService.generatePassword(staff.username);
    request.userRole = staff.userRole;
    request.recordId = staff.recordId;


    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: msg,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes,'+activated ? 'Activate' : 'Deactivate',
    }).then((result) => {
      if (result.value) {
        this.staffService.resetPassword(this.currentUser, request)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('activate/deactivate account response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(res.headerResponse.responseMessage);
              this.addStaffBsModalRef.hide();
              this.logAction(logMsg, PortalMenus.USER_ACCOUNT);
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

  deleteStaff(staff: Staff): void {
    let staffName = staff.fullName;
    Swal.fire({
      position: 'top',
      title: `Confirmation`,
      text: `Do you want to delete ${staffName}?`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.value) {
        this.userAccountService.deleteStaff(this.currentUser, staff.recordId)
          .subscribe({
            next: (res: GeneralResponse) => {
              this.logger.info('deleteStaff response:' + JSON.stringify(res));
              if (res.headerResponse.responseCode !== '000') {
                this.alertService.showErrorMsg(res.headerResponse.responseMessage);
                return;
              }
              this.alertService.showSuccessMsg(`${staffName} deleted successfully`);
              this.addStaffBsModalRef.hide();
              this.logAction(`Updated ${staffName}`, PortalMenus.USER_ACCOUNT);
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



  addStaffModalComponent(staff: Staff, isAddMode: boolean) {
    const initialState: ModalOptions = {
      initialState: {
        isAddMode,
        staff
      }
    };
    this.addStaffModalService.config.ignoreBackdropClick = true;
    this.addStaffModalService.config.animated = true;
    this.addStaffBsModalRef = this.addStaffModalService.show(AddStaffComponent, initialState);
    this.addStaffBsModalRef.content.closeBtnName = 'Close';
  }



  viewStaffModalComponent(staff: Staff) {
    const initialState: ModalOptions = {
      initialState: {
        staff
      }
    };
    this.viewStaffModalService.config.ignoreBackdropClick = true;
    this.viewStaffModalService.config.animated = true;
    this.viewStaffBsModalRef = this.addStaffModalService.show(ViewStaffComponent, initialState);
    this.viewStaffBsModalRef.content.closeBtnName = 'Close';
  }


  loginAccountModalComponent(staff: Staff, isAddMode: boolean) {
    const initialState: ModalOptions = {
      initialState: {
        staff,
        isAddMode
      }
    };
    this.loginAccountModalService.config.ignoreBackdropClick = true;
    this.loginAccountModalService.config.animated = true;
    this.loginAccountBsModalRef = this.addStaffModalService.show(LoginAccountComponent, initialState);
    this.loginAccountBsModalRef.content.closeBtnName = 'Close';
  }


  adminPasswordResetModalComponent(staff: Staff) {
    const initialState: ModalOptions = {
      initialState: {
        staff
      }
    };
    this.adminPasswordResetModalService.config.ignoreBackdropClick = true;
    this.adminPasswordResetModalService.config.animated = true;
    this.adminPasswordResetBsModalRef = this.addStaffModalService.show(AdminPasswordResetComponent, initialState);
    this.adminPasswordResetBsModalRef.content.closeBtnName = 'Close';
  }


  async logAction(msg: string, ui: string): Promise<void> {
    await this.accountService.logUserAudit(msg, ui);
  }
}
