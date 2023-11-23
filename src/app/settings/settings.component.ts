import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from "../@shared/components/page-title.component";
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-manage-customers',
  standalone: true,
  templateUrl: './settings.component.html',
  imports: [ CommonModule, PageTitleComponent, RouterModule, TabsModule ]
})
export class SettingsComponent {

}
