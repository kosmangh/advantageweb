import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Bills } from 'src/app/@models/bill-payment/bills';
import { OccupantProperty } from 'src/app/@models/occupancy/occupant-property';
import { User } from 'src/app/@models/user';
import { AuthService } from 'src/app/@services/auth.service';
import { TimeAgoPipe } from "../../@shared/pipes/time-ago.pipe";

@Component({
    selector: 'app-bill-details',
    standalone: true,
    templateUrl: './bill-details.component.html',
    imports: [CommonModule, TimeAgoPipe]
})
export class BillDetailsComponent implements OnInit {

    currentUser: User;
    bills: Bills;
    occupant: OccupantProperty;
    constructor(
        public modalRef: BsModalRef,
        private accountService: AuthService,
    ) {
        this.accountService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit(): void {
        this.modalRef.setClass("gray modal-md modal-dialog-top");
    }

}
