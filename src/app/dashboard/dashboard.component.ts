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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [ CommonModule, PageTitleComponent, AvatarBgPipe, AvatarNamePipe ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  currentUser!: User;
  greetMsg: string;
  dashboardSummary: any;
  listOfAuditLogs: any;



  constructor(
    private accountService: AuthService,
    private alertService: AlertService,
    private utilsService: UtilsService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }



  ngOnInit(): void {
    this.findDay();
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

  buttonVisible: boolean = false;

  showButton(): void {
    this.buttonVisible = true;
  }

  hideButton(): void {
    this.buttonVisible = false;
  }


}


