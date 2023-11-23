import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Occupant } from 'src/app/@models/occupancy/occupant';
import { User } from 'src/app/@models/user';
import { AuthService } from 'src/app/@services/auth.service';
import { AvatarBgPipe } from "../../@shared/pipes/avatar-bg.pipe";
import { AvatarNamePipe } from "../../@shared/pipes/avatar-name.pipe";
import { TimeAgoPipe } from "../../@shared/pipes/time-ago.pipe";
import { RemoveHyphenPipe } from "../../@shared/pipes/remove-hyphen.pipe";

@Component({
    standalone: true,
    selector: 'app-view-advert-details',
    templateUrl: './view-occupant-details.component.html',
    imports: [CommonModule, AvatarBgPipe, AvatarNamePipe, TimeAgoPipe, RemoveHyphenPipe]
})
export class ViewOccupantDetailsComponent implements OnInit {

  currentUser: User;
  occupant: Occupant;

  constructor(
    public viewOccupantBsModalRef: BsModalRef,
    private accountService: AuthService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.viewOccupantBsModalRef.setClass("gray modal-md modal-dialog-top");
  }

}
