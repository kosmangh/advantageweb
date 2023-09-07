import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from "../@shared/components/page-title.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  imports: [ CommonModule, PageTitleComponent, RouterModule ]
})
export class SettingsComponent {

}
