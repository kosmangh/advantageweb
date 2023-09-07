import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../@services/auth.service';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent implements OnInit {

  constructor(private accountService: AuthService) { }

  ngOnInit(): void {
  }

  goToLogin(): void {
    this.accountService.logout();
  }
}
