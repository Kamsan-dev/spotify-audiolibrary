import { Component, OnChanges, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../services/spotify.service';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';
import { HttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { debounce } from 'lodash';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, NgHeroiconsModule, FormsModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit{

  songInfo: any;
  songPlaying: boolean = this.spotifyService.isPlaying();

  volume: number = 50;
  progress_ms: number = 0;

  playerState: any;
  songProgressValue : number = 0;


  constructor(private spotifyService: SpotifyService, private httpClient: HttpClient) { 

    effect(() => {
      this.songPlaying = this.spotifyService.isPlaying();
      console.log("Inside player component : " + this.songPlaying);
    });

  }

  ngOnInit(): void {

    let playerStateInterval = () => setInterval(() => {
      this.spotifyService.getCurrentlyPlayingTrack().subscribe((player) => {
        if (player != null){
         this.playerState = player;
         console.log(this.playerState);
         this.spotifyService.setIsPlaying(this.playerState.is_playing);
        }
      });

      this.getSongProgress();
    }, 500);

    playerStateInterval();



    if (localStorage.getItem('trackId') != null || localStorage.getItem('trackId')!= undefined) {
      this.spotifyService.setTrackId(localStorage.getItem('trackId')!);
      this.spotifyService.getSongInfo().subscribe((response) => {
        console.log(response);
        this.songInfo = response;
        this.spotifyService.currentTrackInfo.next(response);
      });
    }

    this.spotifyService.currentTrackInfo.subscribe((trackInfo) => {
      if (trackInfo!= null){
        this.songInfo = trackInfo;
      }
      console.log(this.songInfo);
    });

  }

  setVolume(): void {

    console.log("volume : " + this.volume);
    if (this.volume >= 0 && this.volume <= 100) {
      const debonce = debounce(() => {
        this.spotifyService.setPlaybackVolume(Number(this.volume)).subscribe();
      }, 400);

      debonce();
    }
  }

  handlePlayPause() {

    this.spotifyService.getPlaybackState().subscribe((response) => {

      this.progress_ms = response['progress_ms'];

      if (!(response['is_playing'])){
        this.spotifyService.playSong(this.progress_ms);
        //this.spotifyService.setIsPlaying(true);
      } else {
        console.log("pause click");
        //this.spotifyService.setIsPlaying(false);
        this.spotifyService.pauseSong().subscribe();
      }
    });
  }

  getSongProgress(): void {

    if (this.playerState != null || this.playerState != undefined){
      if (!this.playerState.is_playing && this.progress_ms == 0) {
        this.songProgressValue = 0;
      }
      else {
        let percent = Math.trunc((this.playerState.progress_ms / this.playerState.item.duration_ms)* 100);
        if (!Number.isNaN(percent)){
          this.songProgressValue = percent;
        } else this.songProgressValue = 0;
      }
    }
  }

  OnProgressBarChange() : void {
    this.progress_ms = (this.songProgressValue * this.playerState.item.duration_ms) / 100;
    const debonce = debounce(() => {
      console.log('progress bar ' + this.progress_ms + ' ms');  
      this.spotifyService.playSong(this.progress_ms);
      this.spotifyService.setIsPlaying(true);
      this.getSongProgress();
    }, 400);
    debonce();
  }
}
