import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verifyStatus',
  standalone: true,
})
export class VerifyStatusPipe implements PipeTransform {

  transform(text: string): string {
    if (text === 'Y' || text === '000') {
      return 'Linked';
    } else if (text === 'N' || text === null || text === '') {
      return 'Pending Approval';
    } else if (text === 'U') {
      return 'Modified Pending Approval';
    } else if (text === 'R' || text !== '000') {
      return 'Failed';
    }
    return 'Unknown';
  }

}
