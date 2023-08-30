import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSongs',
  standalone: true,
  pure: false
})
export class filterSongsPipe implements PipeTransform {

  transform(items: any[], filter:string) {
      if (filter == '') {
          return items;
      }
      return items.filter((song:any) => song.track.name.toLowerCase().includes(filter));
  }
}
