import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusStyle',
  standalone: true,
})
export class StatusStylePipe implements PipeTransform {

  transform(text: string): string {
    if (text === 'ACTIVE' || text === 'Active' || text === "000") {
      return 'bg-success';
    } else if (text === 'NEW') {
      return 'bg-primary';
    } else if (text === 'RESET' || text === 'Reset') {
      return 'bg-warning';
    } else if (text === 'INACTIVE' || text=== 'inactive' || text !== "000") {
      return 'bg-danger';
    }
    return 'bg-gray';
  }

}
