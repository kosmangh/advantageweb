import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-label',
  standalone: true,
  imports: [ CommonModule ],
  template: `
 <label class="form-label" for="{{labelForName}}"> {{labelName }}
  <span *ngIf="showRequired">
    <span class="text-danger"> * </span>
  </span>
  <span *ngIf="!showRequired">
    <span class="sub-text-sm text-primary">(optional)</span>
  </span>
</label>
    `

})
export class FormLabelComponent implements OnInit {

  @Input() labelName!: string;
  @Input() labelForName!: string;
  @Input() showRequired: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
