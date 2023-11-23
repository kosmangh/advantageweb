import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [ CommonModule ],
  template: `
  <div class="nk-block-head nk-block-head-sm mb-4">
  <div class="nk-block-between">
    <div class="nk-block-head-content">
      <h3 class="nk-block-title page-title"> 
         <span class="nk-menu-icon">
          <em class="icon ni ni-{{icon}} text-primary"></em>
        </span>
        {{pageTitleName }}</h3>
      <div class="nk-block-des text-soft">
        <p>{{description }}</p>
      </div>
    </div>

    <div class="nk-block-head-content">
      <div class="toggle-wrap nk-block-tools-toggle"><a href="#" class="btn btn-icon btn-trigger toggle-expand me-n1"
          data-target="pageMenu"><em class="icon ni ni-more-v"></em></a>
        <div class="toggle-expand-content" data-content="pageMenu">
          <ul class="nk-block-tools g-3">
            <li>
              <ng-content select=".newButtonName"> </ng-content>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
  
  `,
})
export class PageTitleComponent implements OnInit {
  @Input() pageTitleName!: string;
  @Input() description!: string;
  @Input() icon!: string;
  @Output() myOutputValue = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    // this.currentPage();
  }







}
