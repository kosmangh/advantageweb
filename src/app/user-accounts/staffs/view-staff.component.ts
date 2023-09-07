import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/@models/user';
import { Staff } from 'src/app/@models/user-accounts/staff';
import { AuthService } from 'src/app/@services/auth.service';
import { TimeAgoPipe } from "../../@shared/pipes/time-ago.pipe";
import { RemoveHyphenPipe } from "../../@shared/pipes/remove-hyphen.pipe";

@Component({
    standalone: true,
    templateUrl: './view-staff.component.html',
    imports: [CommonModule, TimeAgoPipe, RemoveHyphenPipe]
})
export class ViewStaffComponent implements OnInit {

  currentUser: User;
  staff: Staff;

  constructor(
    public viewStaffBsModalRef: BsModalRef,
    private accountService: AuthService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.viewStaffBsModalRef.setClass("gray modal-md modal-dialog-top");
  }
}
