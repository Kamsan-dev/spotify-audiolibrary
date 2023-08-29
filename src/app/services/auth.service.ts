import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environments } from 'src/environments/environments';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


    clientId:string = environments.clientID;
    redirectUri:string =  environments.redirectUri;
    loggedIn:boolean = false;

    scopes = [
      "user-read-currently-playing", 
      "user-read-private",
      "user-read-email",
      "user-read-recently-played", 
      "user-read-playback-state", 
      "user-read-playback-position",
      "user-top-read", 
      "user-library-read", 
      "playlist-read-private", 
      "playlist-read-collaborative",
      "app-remote-control",
      "user-follow-read",
      "user-modify-playback-state",
      "streaming"
    ].join(",");

    params = {
      response_type: 'token',
      client_id: this.clientId,
      scope: this.scopes,
      redirect_uri: this.redirectUri
    };
  
    queryParamsString = new URLSearchParams(this.params);
  
    LOGIN_URL = "https://accounts.spotify.com/authorize?" + this.queryParamsString.toString();

    constructor(private httpClient: HttpClient, 
      private route:ActivatedRoute,
      private router:Router) { 

      }

    getAuth():any {

      console.log(this.LOGIN_URL);
      window.location.href = this.LOGIN_URL;

    }

    getAccessToken(): void {

      const hash = window.location.hash
      if (hash) {
        const access_token = hash.substring(1).split("&")[0].split("=")[1];
        console.log(access_token);
        localStorage.setItem('access_token', access_token);
        this.loggedIn = true;
      }
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }
}