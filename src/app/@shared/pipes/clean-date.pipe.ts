import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'cleanDate'
})
export class CleanDatePipe implements PipeTransform {
  transform(value: any): Date {
    if (value) {
      let cleanedDate = value.toString().replace("[UTC]", "");
      return new Date(cleanedDate);
    }
    return null;
  }
}