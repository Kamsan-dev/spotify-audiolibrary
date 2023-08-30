import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat',
  standalone: true,
  pure: false
})
export class DurationFormatPipe implements PipeTransform {

  transform(value: number, ...args: any[]) {
    let minutes = Math.floor(value / 60000);
    let seconds = ((value % 60000) / 1000).toFixed(0);
    return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;
  }
}

