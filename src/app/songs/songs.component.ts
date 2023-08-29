import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../services/spotify.service';
import { SongCardComponent } from '../song-card/song-card.component';
import { NgHeroiconsModule} from '@dimaslz/ng-heroicons';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule, SongCardComponent, NgHeroiconsModule],
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit{

  @Input() songsOfCurrentPlaylist: any;

  constructor (private  spotifyService: SpotifyService) { }

  ngOnInit() {

  }   

  ngOnChanges() { 
    console.log(this.songsOfCurrentPlaylist);
  }

  onSelectTrack(trackURI: string, trackID: string) : void {

    this.spotifyService.setTrackId(trackID);
    this.spotifyService.setTrackURI(trackURI);
    this.spotifyService.playSong();

  }

}
