import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationFormatPipe } from '../pipes/duration-format.pipe';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-song-card',
  standalone: true,
  imports: [CommonModule, DurationFormatPipe],
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css']
})
export class SongCardComponent implements OnInit {

  @Input() song: any;
  @Input() index: number;

  constructor (
    private spotifyService: SpotifyService
  ) { }  


  ngOnInit(): void {

  }

}
