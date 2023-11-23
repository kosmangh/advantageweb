import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Occupant } from 'src/app/@models/occupancy/occupant';
import { User } from 'src/app/@models/user';
import { AuthService } from 'src/app/@services/auth.service';
import { AvatarBgPipe } from 'src/app/@shared/pipes/avatar-bg.pipe';
import { AvatarNamePipe } from 'src/app/@shared/pipes/avatar-name.pipe';
import { RemoveHyphenPipe } from 'src/app/@shared/pipes/remove-hyphen.pipe';
import { TimeAgoPipe } from 'src/app/@shared/pipes/time-ago.pipe';
import { OccupantProperty } from 'src/app/@models/occupancy/occupant-property';

@Component({
  standalone: true,
  imports: [ CommonModule, AvatarBgPipe, AvatarNamePipe, TimeAgoPipe, RemoveHyphenPipe ],
  templateUrl: './view-occupant-property.component.html'
})
export class ViewOccupantPropertyComponent implements OnInit {

  currentUser: User;
  occupantProperty: OccupantProperty;

  constructor(
    public viewOccupantPropertyBsModalRef: BsModalRef,
    private accountService: AuthService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
    // alert(JSON.stringify(this.occupantProperty));
  }

  ngOnInit(): void {
    this.viewOccupantPropertyBsModalRef.setClass("gray modal-md modal-dialog-top");
  }
}
