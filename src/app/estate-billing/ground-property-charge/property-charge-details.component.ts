import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Estate } from 'src/app/@models/settings/estate';
import { User } from 'src/app/@models/user';
import { AuthService } from 'src/app/@services/auth.service';
import { AvatarBgPipe } from 'src/app/@shared/pipes/avatar-bg.pipe';
import { AvatarNamePipe } from 'src/app/@shared/pipes/avatar-name.pipe';
import { RemoveHyphenPipe } from 'src/app/@shared/pipes/remove-hyphen.pipe';
import { TimeAgoPipe } from 'src/app/@shared/pipes/time-ago.pipe';
import { PropertyCharge } from 'src/app/@models/estate-billing/property-charge';

@Component({
  selector: 'app-property-charge-details',
  standalone: true,
  imports: [ CommonModule, AvatarNamePipe, AvatarBgPipe, TimeAgoPipe, RemoveHyphenPipe ],

  templateUrl: './property-charge-details.component.html'
})
export class PropertyChargeDetailsComponent implements OnInit {

  currentUser: User;
  propertyCharge: PropertyCharge;

  constructor(
    public addPropertyChargeDetailsBsModalRef: BsModalRef,
    private accountService: AuthService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.addPropertyChargeDetailsBsModalRef.setClass("gray modal-md modal-dialog-top");
  }

}
