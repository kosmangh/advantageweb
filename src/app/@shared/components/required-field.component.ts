import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-required-field',
  standalone: true,
  imports: [ CommonModule ],
  template: `
  @if (errorMsg) {
    <em class="icon ni ni-cross-circle fs-12px"></em> {{errorMsg}}
  }@else {
    <em class="icon ni ni-cross-circle fs-12px"></em> This field is required
  }
  `
})
export class RequiredFieldComponent {
  @Input() errorMsg: string
}
