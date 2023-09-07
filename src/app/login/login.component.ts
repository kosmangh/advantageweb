import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { PortalMenus } from '../@models/portalMenus';
import { LoginResponse } from '../@restmodels/auth/login.response';
import { AuthService } from '../@services/auth.service';
import { AlertService } from '../@services/alert.service';
import { CopyRightComponent } from '../@shared/components/copy-right.component';
import { AlertComponent } from '../@shared/components/alert.component';
import { FormLabelComponent } from '../@shared/components/form-label.component';
import { RequiredFieldComponent } from "../@shared/components/required-field.component";

@Component({
  standalone: true,
  templateUrl: './login.component.html',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, AlertComponent,
    FormLabelComponent, CopyRightComponent, RequiredFieldComponent ]
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  show!: boolean;
  submitted!: boolean;

  constructor(
    private fb: FormBuilder,
    private accountService: AuthService,
    private router: Router,
    private alertService: AlertService) { }


  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
      password: [ '', { updateOn: 'blur', validators: [ Validators.required ] } ],
    });
  }

  showPassword(): void {
    this.show = !this.show;
  }

  get loginForm() { return this.loginFormGroup.controls; }


  onSubmit(): any {
    // reset alerts on submit
    this.alertService.clear();
    this.submitted = true;
    if (!this.loginFormGroup.valid) {
      return;
    }
    this.accountService.loginUser(this.loginFormGroup.value.username, this.loginFormGroup.value.password)
      .subscribe({
        next: (res: LoginResponse) => {
          console.info('login response ' + JSON.stringify(res));
          if (res.headerResponse.responseCode !== '000') {
            this.alertService.error(res.headerResponse.responseMessage);
            this.submitted = false;
            this.accountService.logout();
            return;
          }
          this.logAction('Logged in', PortalMenus.LOGIN);

          if (res.status==='NEW' || res.status==='RESET') {
            this.router.navigate([ '/reset' ]);
          } else {
            this.router.navigate([ '/dashboard' ]);
          }

        },
        error: error => {
          this.alertService.error(error);
          this.submitted = false;
        }
      });
  }


  async logAction(msg: string, ui: string): Promise<void> {
    await this.accountService.logAction(msg, ui);
  }

}
