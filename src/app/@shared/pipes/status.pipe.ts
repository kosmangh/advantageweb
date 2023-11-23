import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone: true,
})
export class StatusPipe implements PipeTransform {

  transform(text: string): string {
    if (text === '000') {
      return 'Linked';
    } else if (text === 'N' || text === null || text === '') {
      return 'Pending Approval';
    } else if (text === 'U') {
      return 'Modified Pending Approval';
    } else if (text !== '000') {
      return 'Failed';
    }
    return 'Unknown';
  }

}
