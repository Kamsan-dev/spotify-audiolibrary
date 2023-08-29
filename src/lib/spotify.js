import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "user-read-currently-playing", 
    "user-read-recently-played", 
    "user-read-playback-state", 
    "user-read-playback-position",
    "user-top-read", 
    "user-library-read", 
    "playlist-read-private", 
    "playlist-read-collaborative" 
  ].join(",");

  const params = {
    scope: scopes
  };

  const queryParamsString = new URLSearchParams(params);

  const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParamsString.toString();

  const spotifyApi = new SpotifyWebApi({ 
    clientId: process.env.PUBLIC_CLIENT_ID,
    clientSecret: process.env.PUBLIC_CLIENT_SECRET,
    redirectUri: "http://localhost:4200"
  });


  export default spotifyApi;
  export { LOGIN_URL };