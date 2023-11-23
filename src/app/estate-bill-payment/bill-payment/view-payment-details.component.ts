import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { PropertyLedger } from "src/app/@models/estate-billing/property-ledger";
import { Occupant } from "src/app/@models/occupancy/occupant";
import { OccupantProperty } from "src/app/@models/occupancy/occupant-property";
import { User } from "src/app/@models/user";
import { AuthService } from "src/app/@services/auth.service";
import { AvatarBgPipe } from "src/app/@shared/pipes/avatar-bg.pipe";
import { AvatarNamePipe } from "src/app/@shared/pipes/avatar-name.pipe";
import { RemoveHyphenPipe } from "src/app/@shared/pipes/remove-hyphen.pipe";
import { TimeAgoPipe } from "src/app/@shared/pipes/time-ago.pipe";

@Component({
  standalone: true,
  templateUrl: './view-payment-details.component.html',
  imports: [ CommonModule, AvatarBgPipe, AvatarNamePipe, TimeAgoPipe, RemoveHyphenPipe ]
})
export class ViewPaymentDetailsComponent implements OnInit {

  currentUser: User;
  propertyLedger: PropertyLedger;
  selectedOccupant: OccupantProperty;
  constructor(
    public paymentDetailsBsModalRef: BsModalRef,
    private accountService: AuthService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.paymentDetailsBsModalRef.setClass("gray modal-md modal-dialog-top");
  }

}