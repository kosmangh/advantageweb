import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from "../@shared/components/page-title.component";
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    templateUrl: './occupancy.component.html',
  imports: [ CommonModule, RouterModule, PageTitleComponent]
})
export class OccupancyComponent {

}
