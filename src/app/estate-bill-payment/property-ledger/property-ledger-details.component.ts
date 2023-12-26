import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PropertyLedger } from 'src/app/@models/bill-payment/property-ledger';
import { User } from 'src/app/@models/user';
import { AuthService } from 'src/app/@services/auth.service';
import { TimeAgoPipe } from "../../@shared/pipes/time-ago.pipe";
import { RemoveHyphenPipe } from "../../@shared/pipes/remove-hyphen.pipe";

@Component({
    selector: 'app-property-ledger-details',
    standalone: true,
    templateUrl: './property-ledger-details.component.html',
    imports: [
        CommonModule,
        TimeAgoPipe,
        RemoveHyphenPipe
    ]
})
export class PropertyLedgerDetailsComponent implements OnInit {
    currentUser: User;
    propertyLedger: PropertyLedger;
    constructor(
        public bsModalRef: BsModalRef,
        private accountService: AuthService,
    ) {
        this.accountService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit(): void {
        this.bsModalRef.setClass("gray modal-md modal-dialog-top");
    }

}
