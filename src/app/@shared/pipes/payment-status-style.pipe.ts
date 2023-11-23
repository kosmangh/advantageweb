import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentStatusStyle',
  standalone: true,
})
export class PaymentStatusStylePipe implements PipeTransform {

  transform(text: string): string {
    if (text == 'PAID' || text === 'Paid') {
      return 'badge badge-dim bg-outline-success ';
    } else if (text == 'PARTIAL' || text === 'Partial') {
      return 'badge badge-dim bg-outline-primary ';
    } else if (text == 'PENDING' || text === 'Pending') {
      return 'badge badge-dim bg-outline-danger';
    }
    return 'badge badge-dim  bg-outline-secondary';
  }
}
