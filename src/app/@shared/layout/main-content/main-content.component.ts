import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/@models/user';
import { AuthService } from 'src/app/@services/auth.service';
import { CopyRightComponent } from '../../components/copy-right.component';
import { RouterModule } from '@angular/router';
import { AppMenusComponent } from '../app-menus/app-menus.component';
import { AvatarNamePipe } from '../../pipes/avatar-name.pipe';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [ CommonModule, AppMenusComponent, CopyRightComponent, RouterModule, AvatarNamePipe ],
  templateUrl: './main-content.component.html',
})
export class MainContentComponent implements OnInit {

  currentUser?: User;

  lang = 'US';
  flag = 'gb';
  currentPageName: any;

  constructor(
    private accountService: AuthService,
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit(): void {
    if (this.flag === 'en') {
      this.lang = 'US';
    } else if (this.flag === 'fr') {
      this.lang = 'FR';
    } else {
      this.lang = 'PT';
    }
    localStorage.setItem('lang', this.flag);
  }

  public change2English(): void {
    this.lang = 'US';
    this.flag = 'en';
    localStorage.setItem('lang', "en");
  }

  public change2French(): void {
    this.lang = 'FR';
    this.flag = 'fr';
    localStorage.setItem('lang', "fr");
  }

  public change2Portuguese(): void {
    this.lang = 'PT';
    this.flag = 'pt';
    localStorage.setItem('lang', "pt");
  }

  signOut(): void {
    this.accountService.logout();
  }

}
