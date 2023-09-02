import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  currentPlaylistId = new BehaviorSubject<string>('');
  currentTrackId: string;
  currentTrackURI: string;

  isPlaying:WritableSignal<boolean> = signal<boolean>(false); 
  currentTrackInfo = new BehaviorSubject<any>([]);



  constructor(private httpClient: HttpClient) { 
  }


  setIsPlaying(isPlaying: boolean){
    this.isPlaying.set(isPlaying);
  }

  setPlaylistId(playlistId: string){
    this.currentPlaylistId.next(playlistId);
    localStorage.setItem('playlistId', playlistId);
  }

  setTrackId(trackId: string){
    this.currentTrackId = trackId;
    localStorage.setItem('trackId', trackId);
  }

  setTrackURI(trackURI: string){
    this.currentTrackURI = trackURI;
  }

  getPlaylistTracks(playlistId: string) : Observable<any> {
    return this.httpClient.get('https://api.spotify.com/v1/playlists/'+playlistId, this.getHeaders())
  }

  getUserPlaylists() : Observable<any> {
    return this.httpClient.get('https://api.spotify.com/v1/me/playlists', this.getHeaders());
  }


  async getTrackInfo() : Promise<Observable<any>> {
    return this.httpClient.get('https://api.spotify.com/v1/tracks/'+this.currentTrackId, this.getHeaders())
  }

  getSongInfo() : Observable<any> {
    return this.httpClient.get('https://api.spotify.com/v1/tracks/'+this.currentTrackId, this.getHeaders())
  }

  getPlaybackState(): Observable<any> {
    return this.httpClient.get('https://api.spotify.com/v1/me/player', this.getHeaders());
  }

  getCurrentlyPlayingTrack() : Observable<any> {
    return this.httpClient.get('https://api.spotify.com/v1/me/player/currently-playing', this.getHeaders())
   }

  pauseSong(): Observable<any> {
    return this.httpClient.put('https://api.spotify.com/v1/me/player/pause', {}, this.getHeaders());
  }

  setPlaybackVolume(volume: number): Observable<any> {
    return this.httpClient.put('https://api.spotify.com/v1/me/player/volume?volume_percent='+volume, {}, this.getHeaders());
  }
  

  /* PLAYER METHODS */

  async playSong(progress_ms: number = 0) : Promise<void> {

    this.setIsPlaying(true);
    console.log(this.currentTrackId);

    (await this.getTrackInfo()).subscribe((data) => {
      this.currentTrackInfo.next(data);
      console.log(this.currentTrackInfo);
    });
    
    const body = { "uris": [this.currentTrackURI] , "position_ms" : progress_ms}
      this.httpClient.put('https://api.spotify.com/v1/me/player/play', 
      body, this.getHeaders()).subscribe((res) => {
    })
  }

  getHeaders() : Object {
     return {
        headers: {
          'Authorization': 'Bearer '+ localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        }
      }
   }
}
