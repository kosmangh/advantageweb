import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarBg',
  standalone: true,
})
export class AvatarBgPipe implements PipeTransform {

  transform(name:string): any {

    const months = [ "bg-info-dim", "bg-warning-dim", "bg-primary-dim", "bg-success-dim", "bg-danger-dim", "bg-purple-dim", "bg-indigo-dim" ];

    const random = Math.floor(Math.random() * months.length);
    // console.log(random, months[ random ]);
    return months[ random ];
  }

}
