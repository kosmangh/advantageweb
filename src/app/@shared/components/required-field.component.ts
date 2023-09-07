import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-required-field',
  standalone: true,
  imports: [ CommonModule ],
  template: `
    <em class="icon ni ni-cross-circle fs-12px"></em> This field is required
  `
})
export class RequiredFieldComponent {

}
