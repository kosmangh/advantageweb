import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-bill-arrears',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './bill-arrears.component.html',
})
export class BillArrearsComponent implements OnInit {

    ngOnInit(): void { }

}
