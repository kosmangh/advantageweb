import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verifyStatusStyle',
  standalone: true,
})
export class VerifyStatusStylePipe implements PipeTransform {

  transform(text: string): string {
    if (text == 'RECEIVED' || text === 'Received') {
      return 'badge badge-dim bg-outline-success ';
    } else if (text == 'PARTIAL' || text === 'Partial') {
      return 'badge badge-dim bg-outline-primary';
    } else if (text == 'PENDING' || text === 'Pending') {
      return 'badge badge-dim bg-outline-warning';
    } else if (text == 'ORDERED' || text !== 'Ordered') {
      return 'badge badge-dim  bg-outline-secondary';
    }
    return 'badge badge-dim  bg-outline-danger';
  }

  //  <span class="badge badge-dim bg-primary" > Primary < /span>
  // < span class="badge badge-dim rounded-pill bg-primary" > Primary < /span>

}
