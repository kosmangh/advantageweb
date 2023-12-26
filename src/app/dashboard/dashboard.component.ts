import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from "../@shared/components/page-title.component";
import { User } from '../@models/user';
import { NGXLogger } from 'ngx-logger';
import { AlertService } from '../@services/alert.service';
import { UtilsService } from '../@services/utils.service';
import { AuthService } from '../@services/auth.service';
import { AvatarBgPipe } from "../@shared/pipes/avatar-bg.pipe";
import { AvatarNamePipe } from "../@shared/pipes/avatar-name.pipe";
import { DashboardService } from '../@services/dashboard.service';
import { DashboardResponse } from '../@restmodels/dashboard.response';
import { FullNameComponent } from "../@shared/components/full-name.component";

@Component({
  selector: 'app-dashboard-old',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [ CommonModule, PageTitleComponent, AvatarBgPipe, AvatarNamePipe, FullNameComponent ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  currentUser!: User;
  greetMsg: string;
  dashboardSummary: DashboardResponse;
  listOfAuditLogs: any;



  constructor(
    private accountService: AuthService,
    private alertService: AlertService,
    private dashboardService: DashboardService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.findDay();
    // this.fetchDashboardSummary();
  }
  ngOnDestroy(): void {
  }

  findDay() {
    let myDate = new Date();
    let hrs = myDate.getHours();
    if (hrs < 12)
      this.greetMsg = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
      this.greetMsg = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
      this.greetMsg = 'Good Evening';
  }


  fetchDashboardSummary(): void {

    this.dashboardService.getDashboardSummary(this.currentUser).subscribe({
      next: (res: DashboardResponse) => {
        if (res.headerResponse.responseCode !== "000") {
          this.alertService.showErrorMsg(res.headerResponse.responseMessage);
          return;
        }
        this.dashboardSummary = res;
      },
      error: error => {
        this.alertService.showInfoMsg(error);
      }
    });
  }




}


