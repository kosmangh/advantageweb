import { AuditLog } from './../../@models/auditLog';
import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-modal-footer-slot',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `
    <div class="modal-footer mt-2"></div>
    <div class="row">
        <div class="d-flex mb-4">
            <div class="p-2 flex-grow-1">
                <div class="col-auto">
                <ng-content select=".saveAndNew" />
                </div>
            </div>
            <div class="p-2 ">
                 <div class="col-auto">
                <ng-content select=".closeButton"/>
                 </div>
            </div>
            <div class="p-2 ">
                <div class="col-auto">
                <ng-content select=".delete" />
                </div>
            </div>
            <div class="p-2 ">
                <div class="col-auto">
                <ng-content select=".createAndUpdate" />
                </div>
            </div>
        </div>
    </div>
    `
})
export class ModalFooterSlotComponent implements OnInit {

    ngOnInit(): void { }

}
