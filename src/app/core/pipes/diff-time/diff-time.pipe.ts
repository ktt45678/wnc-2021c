import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diffTime'
})
export class DiffTimePipe implements PipeTransform {

  transform(value: string, ...args: string[]): number {
    const time = new Date(value).getTime();
    const now = Date.now();
    return now - time;
  }

}
