import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from 'src/app/@models/alert';
import { AlertService } from 'src/app/@services/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [ CommonModule ],
  template: `
  <div>
    <div *ngFor="let alert of alerts" class="{{cssClass(alert)}}">
        <a class="close" (click)="removeAlert(alert)">
          <span class="btn-close" style="font-size: 12px;margin-right: 10px;color: #fff;"></span>
        </a>
        <span class="text-center" [innerHTML]="alert.message"></span>
    </div>
</div>
  
  `
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription: Subscription = new Subscription();
  routeSubscription: Subscription = new Subscription();

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    // subscribe to new alert notifications
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        // clear alerts when an empty alert is received
        if (!alert.message) {
          // filter out alerts without 'keepAfterRouteChange' flag
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          this.alerts.forEach(x => delete alert.keepAfterRouteChange);
          return;
        }

        // add alert to array
        this.alerts.push(alert);

        // auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      });

    // clear alerts on location change
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  ngOnDestroy(): void {
    // unsubscribe to avoid memory leaks
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert): void {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) { return; }

    if (this.fade) {
      // fade out alert
      alert.fade = true;

      // remove alert after faded out
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      // remove alert
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert): any {
    if (!alert) { return; }

    const classes = [ 'alert', 'alert-dismissable', 'mt-4', 'container' ];

    const alertTypeClass = {
      [ AlertType.Success ]: 'alert alert-success',
      [ AlertType.Error ]: 'alert alert-danger',
      [ AlertType.Info ]: 'alert alert-info',
      [ AlertType.Warning ]: 'alert alert-warning'
    };

    classes.push(alertTypeClass[ alert.type ]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }


}
