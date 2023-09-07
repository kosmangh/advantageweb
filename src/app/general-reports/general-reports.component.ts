import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageTitleComponent } from "../@shared/components/page-title.component";

@Component({
    standalone: true,
    templateUrl: './general-reports.component.html',
    imports: [CommonModule, RouterModule, PageTitleComponent]
})
export class GeneralReportsComponent {

}
