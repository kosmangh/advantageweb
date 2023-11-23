import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Estate } from 'src/app/@models/settings/estate';
import { User } from 'src/app/@models/user';
import { AuthService } from 'src/app/@services/auth.service';
import { AvatarNamePipe } from "../../@shared/pipes/avatar-name.pipe";
import { AvatarBgPipe } from "../../@shared/pipes/avatar-bg.pipe";
import { TimeAgoPipe } from "../../@shared/pipes/time-ago.pipe";
import { RemoveHyphenPipe } from "../../@shared/pipes/remove-hyphen.pipe";
import { CleanDatePipe } from "../../@shared/pipes/clean-date.pipe";

@Component({
    standalone: true,
    templateUrl: './estate-details.component.html',
    imports: [CommonModule, AvatarNamePipe, AvatarBgPipe, TimeAgoPipe, RemoveHyphenPipe, CleanDatePipe]
})
export class EstateDetailsComponent implements OnInit {
 
  currentUser: User;
  estate: Estate;

  constructor(
    public viewEstateBsModalRef: BsModalRef,
    private accountService: AuthService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.viewEstateBsModalRef.setClass("gray modal-md modal-dialog-top");
  }


}
