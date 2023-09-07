import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-email-not-valid',
  standalone: true,
  imports: [ CommonModule ],
  template: `
    * Invalid email address
  `
})
export class EmailNotValidComponent {

}
