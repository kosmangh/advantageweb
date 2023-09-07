import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './@shared/layout/footer/footer.component';
import { LoggerModule } from "ngx-logger";
import { NgHttpLoaderModule, Spinkit } from 'ng-http-loader';
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthService } from './@services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterModule, CommonModule, FooterComponent, LoggerModule, NgHttpLoaderModule ],
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  title = 'advantage';
  spinnerStyle = Spinkit;
  SESSION_TIMEOUT: number = 20 * 60;
  // SESSION_TIMEOUT: number = 2;

  constructor(
    private bnIdle: BnNgIdleService,
    private accountService: AuthService,

  ) {

  }

  ngOnInit(): void {
    this.bnIdle.startWatching(this.SESSION_TIMEOUT).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        console.log('session expired');
        this.accountService.logout();
      }
    });
  }
}


