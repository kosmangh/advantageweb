import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusStyle',
  standalone: true,
})
export class StatusStylePipe implements PipeTransform {

  /**
   * Transforms a given text into a CSS class name based on certain conditions.
   * @param text - The text to be transformed into a CSS class name.
   * @returns The CSS class name corresponding to the given text.
   */
  transform(text: string): string {
    switch (text.toUpperCase()) {
      case 'ACTIVE':
      case '000':
        return 'badge badge-dim  bg-outline-success';
      case 'NEW':
      case 'PART_PAYMENT':
        return 'badge badge-dim  bg-outline-primary';
      case 'RESET':
        return 'badge badge-dim  bg-outline-warning';
      default:
        return 'badge badge-dim  bg-outline-danger';

    }
  }

}
