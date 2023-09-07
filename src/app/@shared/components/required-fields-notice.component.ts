import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-required-fields-notice',
  standalone: true,
  imports: [ CommonModule ],
  template: `
       <span class="badge badge-dot bg-primary fs-13">
        <span>All fields marked
                <span class="text-danger fw-bold fs-16px"> * </span>required!
        </span>
         </span>
  `
})
export class RequiredFieldsNoticeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
