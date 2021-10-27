import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    const date = DateTime.fromISO(value).setLocale('vi-VN');
    const maxTime = args.shift();
    if (maxTime) {
      const diff = date.diffNow().toMillis();
      if (Math.abs(diff) < +maxTime)
        return date.toRelative() || 'Không xác định';
    }
    return date.toFormat('dd/MM/yyyy hh:mm:ss');
  }

}
