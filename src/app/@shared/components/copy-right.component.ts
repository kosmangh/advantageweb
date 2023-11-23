import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-copy-right',
  standalone: true,
  imports: [ CommonModule ],
  template: `
   <span><strong>Copyright &copy; {{copyRightYear}} </strong>Sabonay Technologies. All Rights Reserved. </span>
  `
})
export class CopyRightComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  startYear: number = 2010;
  copyRightYear: string="";
  constructor() { }

  ngOnInit(): void {
    if (this.startYear === this.currentYear) {
      this.copyRightYear = "" + this.currentYear;
    } else {
      this.copyRightYear = this.startYear + " - " + this.currentYear;
    }
  }

}
