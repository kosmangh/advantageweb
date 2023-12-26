import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/@models/user';
import { AuthService } from 'src/app/@services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  templateUrl: './app-menus.component.html'
})
export class AppMenusComponent implements OnInit {

  currentUser: User;

  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  constructor(
    private accountService: AuthService
  ) {
    this.accountService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }
}
