import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
@Component({
  standalone: true,
  imports: [ CommonModule, TooltipModule ],
  selector: 'app-copy-button',
  template: `
    <div class="text-primary" *ngIf="showNotification" >Copied</div>
    <button class="btn btn-outline-light text-primary" tooltip="Copy password" [delay]="500"  (click)="copyToClipboard()"><em class="icon ni ni-copy"></em></button>
  `,
  styles: [ `
    .notification {
      background-color: #f2f2f2;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      /* margin-top: 10px; */
    }
  `]
})
export class CopyButtonComponent {
  @Input() message: string = "";
  showNotification: boolean = false;
  labelName: string = "";
  constructor() {
    document.addEventListener('copy', this.handleCopyEvent.bind(this));
  }
  copyToClipboard() {
    const el = document.createElement('input');
    el.value = this.message;
    document.body.appendChild(el);
    el.select();
    //el.className = "form-control";
    document.execCommand('copy');
    document.body.removeChild(el);
  }
  handleCopyEvent(event: ClipboardEvent) {
    const clipboard = event.clipboardData || window[ 'clipboardData' ];
    if (clipboard) {
      clipboard.setData('text', this.message);
      event.preventDefault();
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 1000);
    }
  }
}