import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NGXLogger } from 'ngx-logger';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { User } from 'src/app/@models/user';
import { AlertService } from 'src/app/@services/alert.service';
import { AuthService } from 'src/app/@services/auth.service';
import { UtilsService } from 'src/app/@services/utils.service';
import { AddItemComponent } from 'src/app/@shared/components/add-item.component';
import { FormLabelComponent } from 'src/app/@shared/components/form-label.component';
import { FullNameComponent } from 'src/app/@shared/components/full-name.component';
import { PageTitleComponent } from 'src/app/@shared/components/page-title.component';
import { ListFilterPipe } from 'src/app/@shared/pipes/list-filter.pipe';
import { RemoveHyphenPipe } from 'src/app/@shared/pipes/remove-hyphen.pipe';
import { StatusStylePipe } from 'src/app/@shared/pipes/status-style.pipe';
import { TimeAgoPipe } from 'src/app/@shared/pipes/time-ago.pipe';
import { AuditLogListResponse } from 'src/app/@restmodels/auth/audit-log-list.response';
import { AuditLog } from 'src/app/@models/auditLog';
import { ExcelExporterService } from 'src/app/@services/excel-exporter.service';

@Component({
  standalone: true,
  templateUrl: './audit-logs.component.html',
  imports: [ CommonModule, PageTitleComponent, FormLabelComponent,
    FormsModule, CalendarModule, AddItemComponent, TableModule, ListFilterPipe, FullNameComponent, TimeAgoPipe, RemoveHyphenPipe, StatusStylePipe ]
})
export class AuditLogsComponent implements OnInit, OnDestroy {

  currentUser: User;
  listOfAudits: AuditLog[];
  searchedKeyword: string;
  searchBy: string;
  searchValue: string;
  searchValueLabel: string;
  searchPlaceholder: string;
  startDate: Date;
  endDate: Date;

  private authService = inject(AuthService);
  private accountService = inject(AuthService);
  private alertService = inject(AlertService);
  private utilsService = inject(UtilsService);
  private excelExporterService = inject(ExcelExporterService);
  private logger = inject(NGXLogger);

  constructor(
    public addStaffBsModalRef: BsModalRef,
    public viewStaffBsModalRef: BsModalRef,
    public loginAccountBsModalRef: BsModalRef,
    public adminPasswordResetBsModalRef: BsModalRef,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.searchBy = "DR";
    this.startDate = this.utilsService.getFirstDayDate();
    this.endDate = new Date();
    this.fetchAudits();
  }

  ngOnDestroy(): void {
  }

  searchByListener() {

    this.searchValue = '';
    if (this.searchBy === "username") {
      this.searchValueLabel = "Username";
      this.searchPlaceholder = " Enter username";
      return;
    }
  }



  fetchAudits(): void {

    this.listOfAudits = [];
    this.authService.searchAuditLogs(this.currentUser, this.searchBy, this.searchValue,this.startDate,this.endDate).subscribe({
      next: (res: AuditLogListResponse) => {
        this.logger.info(`search audit logs response ` + JSON.stringify(res));
        if (res.headerResponse.responseCode !== '000') {
          this.alertService.showErrorMsg(res.headerResponse.responseMessage);
          return;
        }
        if (res.auditLogs.length <= 0) {
          this.alertService.showInfoMsgGeneral("No audits found");
          this.logger.info("No audits found");
          return;
        }
        this.listOfAudits = res.auditLogs;
      },
      error: error => {
        this.logger.error(error);
        this.alertService.showInfoMsg(error);
      }
    });
  }

  exportAudits() {
    this.excelExporterService.exportAsExcelFile(this.listOfAudits, 'audit_logs');
  }


  async logAction(msg: string, ui: string): Promise<void> {
    await this.accountService.logUserAudit(msg, ui);
  }
}
