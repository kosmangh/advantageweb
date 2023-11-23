import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'removeHyphen'
})
export class RemoveHyphenPipe implements PipeTransform {

  transform(fulName: string): any {
    const bits = fulName.trim().split('_');
    return bits
      .map((bit) => bit.trim())
      .join(' ');
      // .toUpperCase();
  }

}
