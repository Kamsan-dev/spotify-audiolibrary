import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHeroiconsModule } from "@dimaslz/ng-heroicons";
import { Router, RouterModule } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgHeroiconsModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  playlists:Array<any> = [];


  constructor
  (
    private router:Router, 
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
  
    this.spotifyService.getUserPlaylists().subscribe((data:any) => {
      for (let item of data['items']) {
          this.playlists.push(
            {
              name:item['name'],
              id:item['id']
            }
          )
        }
      })
  }

  signOut() :void {
    localStorage.removeItem('acess_token');
    this.router.navigate(['/login']);
  }

  showPlaylistId(id: number): void {

    this.spotifyService.setPlaylistId(id.toString());
    //console.log("Playlist id: " + id);

  }
}
