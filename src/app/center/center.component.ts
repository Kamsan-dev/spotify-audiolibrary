import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHeroiconsModule } from "@dimaslz/ng-heroicons";
import { shuffle} from "lodash"
import { SpotifyService } from '../services/spotify.service';
import { SongsComponent } from '../songs/songs.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-center',
  standalone: true,
  imports: [CommonModule, NgHeroiconsModule, SongsComponent],
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css'],
})
export class CenterComponent implements OnInit {

  color:string | undefined;
  colors:Array<string> = [

    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-purple-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500"
  ];

  playlistId:string | undefined;
  playlist:any = {}

  constructor
  (
    private spotifyService: SpotifyService,
    private router: Router
  ) { }


  ngOnInit() :void {

    if (localStorage.getItem("playlistId")) {
      this.playlistId = localStorage.getItem("playlistId")!;
      this.spotifyService.setPlaylistId(this.playlistId);
    }
    /* Change background color */

    /* Obtain the current playlist id & its tracks */
    this.spotifyService.currentPlaylistId.subscribe((value: string) => {
      this.playlistId = value;
      console.log("current playlist id : " + value);
      this.color = shuffle(this.colors).pop();

      if (this.playlistId !=('')){
        this.spotifyService.getPlaylistTracks(this.playlistId).subscribe((data:any) => {
          this.playlist = data;
        })
      }
    })
  }

  signOut() :void {
    this.router.navigate(['/login']);
  }
}
