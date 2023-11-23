import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  currentYear: number = new Date().getFullYear();
  startYear: number = 2010;
  copyRightYear: string = '';
  constructor() { }

  ngOnInit(): void {
    if (this.startYear === this.currentYear) {
      this.copyRightYear = "" + this.currentYear;
    } else {
      this.copyRightYear = this.startYear + " - " + this.currentYear;
    }
  }
}
