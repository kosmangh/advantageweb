import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AvatarBgPipe } from '../pipes/avatar-bg.pipe';
import { AvatarNamePipe } from '../pipes/avatar-name.pipe';

@Component({
  selector: 'app-full-name',
  standalone: true,
  imports: [ CommonModule, AvatarBgPipe, AvatarNamePipe ],
  template: `
  <div class="user-card">
    <div class="user-avatar  d-none d-sm-flex {{''|avatarBg}}" *ngIf="showAvatar">
        <span>{{fullName |avatarName}} </span>
    </div>
    <div class="user-info">
        <span class="text-black">
            {{fullName}}
            <span class="dot dot-success d-md-none ms-1"></span>
        </span>
        <span *ngIf="otherFieldName">
            <br />
            <span>{{otherFieldName}}</span>
        </span>

    </div>
</div>
  `
})
export class FullNameComponent implements OnInit {

  @Input() fullName!: string;
  @Input() otherFieldName!: string;
  @Input() showAvatar:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
