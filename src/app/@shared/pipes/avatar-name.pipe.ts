import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarName',
  standalone: true,
})
export class AvatarNamePipe implements PipeTransform {

  transform(fulName: string): any {

    if (!fulName) {
      return "NF";
    }
    const name = fulName.split(' ');
    let firstName = name[ 0 ];
    let lastName = name[ 1 ];
    if (!lastName) {
      return firstName.slice(0, 2).toUpperCase();
    }
    return (firstName.charAt(0) + "" + lastName.charAt(0)).toUpperCase();

    // const first2Names = fulName.split(' ').slice(0, 2).join(' ');

    // const bits = first2Names.trim().split(' ');
    // return bits
    //   .map((bit) => bit.charAt(0))
    //   .join('')
    //   .toUpperCase();
  }

}
