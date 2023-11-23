import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-add-item',
    standalone: true,
    imports: [ CommonModule ],
    template: `
   <div class="nk-block-head nk-block-head-sm mb-5">
    <div class="nk-block-between">
        <div class="nk-block-head-content">
            <h6 class="nk-block-title">{{pageTitleName}}</h6>
            <div class="nk-block-des text-soft">
                <p>{{description}}</p>
            </div>
        </div>

        <div class="nk-block-head-content">
            <ul class="nk-block-tools g-3">
                <li>
                    <ng-content select=".newItemName"> </ng-content>
                </li>
                 <li >
                    <ng-content select=".anotherItemName"> </ng-content>
                 </li> 
            </ul>
        </div>
    </div>
    <hr />
</div>
  `
})
export class AddItemComponent implements OnInit {
    @Input() pageTitleName!: string;
    @Input() description!: string;
    constructor() { }

    ngOnInit(): void {
    }

}
