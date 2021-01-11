import React from 'react';
import Script from 'react-load-script';

// import LanguageSelect from '../Search/LanguageSelect'
import LyricBox from '../Play/LyricBox'
import MusicPlayer from '../Play/MusicPlayer'
import './PlayPage.css';

var funcPlay;
var funcNext;
var funcPrev;

const SPOTIFY_CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const SPOTIFY_ENCODED_CLIENT = process.env.REACT_APP_SPOTIFY_ENCODED_CLIENT
const GENIUS_ACCESS_TOKEN = process.env.REACT_APP_GENIUS_ACCESS_TOKEN

class PlayPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoadSuccess = this.handleLoadSuccess.bind(this);
    this.httpGetGeniusSearch = this.httpGetGeniusSearch.bind(this);
    this.httpGetGeniusLyrics = this.httpGetGeniusLyrics.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.nextTrack = this.nextTrack.bind(this);
    this.prevTrack = this.prevTrack.bind(this);
    this.state = {
      trackName:"Track Name",
      displayTrackName: "",
      artistName:"Artist Name",
      displayArtistName: "",
      imageURL:"https://i.pinimg.com/originals/b4/75/00/b4750046d94fed05d00dd849aa5f0ab7.jpg",
      songLyrics: "",
      isPlay: false,
    }
  }

  setCookie(name, value, seconds) {
    var expires = "";
    if (seconds) {
        var date = new Date();
        date.setTime(date.getTime() + (seconds*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }
  eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.handleLoadSuccess();
    };
  }

  handleLoadSuccess() {
    console.log("loaded");
    let access_token = this.getCookie('access_token');
    // TODO: use refresh_token
    // const refresh_token = this.getCookie('refresh_token');
    if (!this.props.auth_code && !access_token) {
      this.redirectSpotifyAuth();
      return;
    }
    if (!access_token) {
      const state = this.getCookie('state');
      // Potential attack
      if (this.props.state !== state) {
        return;
      }
      const request_rsp = this.requestSpotifyAccessToken(this.props.auth_code);
      access_token = request_rsp['access_token'];
      const expires_in = request_rsp['expires_in'];
      this.setCookie('access_token', access_token, expires_in);
    }
    
    const player = new window.Spotify.Player({
      name: 'Lyrical Miracle',
      getOAuthToken: cb => { cb(access_token); }
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    var track_name = '';
    // Playback status updates
    player.addListener('player_state_changed', state => {
      console.log(state);
      this.setState({ isPlay: state.paused });
      var cur_track_name = state.track_window.current_track.name;
      if (track_name !== cur_track_name) {
        track_name = cur_track_name;
        var cur_artist_name = state.track_window.current_track.artists[0].name;
        var imgURL = state.track_window.current_track.album.images[0].url;
        this.setState({trackName: track_name});
        this.setState({displayTrackName: track_name});
        this.setState({artistName: cur_artist_name});
        this.setState({displayArtistName: cur_artist_name});
        this.setState({imageURL: imgURL});
        // Get lyrics from Genius
        var genius_json_rsp = this.httpGetGeniusSearch(track_name, cur_artist_name);
        var hits = genius_json_rsp['response']['hits'];
        var song;
        for (var i in hits) {
          var hit = hits[i];
          if (cur_artist_name.toLowerCase() === hit['result']['primary_artist']['name'].toLowerCase()) {
            song = hit;
            break;
          }
        }
        if (typeof(song) !== 'undefined') {
          let song_url = song['result']['url'];
          let webpage = this.httpGetGeniusLyrics(song_url);
          const parser = new DOMParser()
          let lyrics = parser.parseFromString(webpage, "text/html").getElementsByClassName("lyrics")[0].innerHTML;
          const a_open_regex = /<a([\s\S]*?)>/g;
          const a_close_regex = /<\/a>/g;
          lyrics = lyrics.replaceAll(a_open_regex, '').replaceAll(a_close_regex, '');
          this.setState({songLyrics: lyrics});
        }
        else {
          this.setState({songLyrics: "No lyrics found"});
        }
      }
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();

    funcPlay = () =>{
      player.togglePlay();
    }
    funcNext = () =>{
      player.nextTrack();
    }
    funcPrev = () =>{
      player.previousTrack();
    }
  }

  redirectSpotifyAuth() {
    var generateRandomString = function(length) {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };
    const scopes = 'streaming%20user-read-private%20user-read-email';
    const state = generateRandomString(16)
    let url = 'https://accounts.spotify.com/authorize?';
    url += 'client_id=' + SPOTIFY_CLIENT_ID;
    url += '&response_type=code';
    url += '&redirect_uri=https://lyricalmiracle.web.app/';
    url += '&scope=' + scopes;
    url += '&state=' + state;
    this.setCookie('state', state, 1800);
    window.location.replace(url);
  }

  requestSpotifyAccessToken(auth_code) {
    const url = 'https://accounts.spotify.com/api/token'
    let data = 'grant_type=authorization_code'
        + '&code=' + auth_code
        + '&redirect_uri=https://lyricalmiracle.web.app/';
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, false ); // false for synchronous request
    xmlHttp.setRequestHeader('Authorization', 'Basic ' + SPOTIFY_ENCODED_CLIENT)
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttp.send(data);
    return JSON.parse(xmlHttp.responseText);
  }

  httpGetGeniusSearch(song_title, artist_name) {
    let url = 'https://api.genius.com/'
    url += 'search?q=' + song_title + ' ' + artist_name;
    url += '&access_token=' + GENIUS_ACCESS_TOKEN
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false ); // false for synchronous request
    xmlHttp.send();
    return JSON.parse(xmlHttp.responseText);
  }

  httpGetGeniusLyrics(url) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    url = proxyurl + url
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false ); // false for synchronous request
    xmlHttp.send();
    return xmlHttp.responseText;
  }

  togglePlay() {
    this.setState({
      isPlay: !this.state.isPlay
    })
    console.log("TOGGLE!");
    funcPlay();
  }

  nextTrack() {
    funcNext();
    console.log("NEXT!");
  }

  prevTrack() {
    funcPrev();
    console.log("PREV!");
  }
  
  render() {
    return(
      <div className="PlayPage">
        <div className="PlayingSong">
          <div className="AlbumCover">
            <img src={this.state.imageURL} alt="albumCover" width="128" height="128"></img>
          </div>
          <div className ="SongAndPlayer">
            <p className ="SongTitle"> {this.state.trackName}</p>
            <p className ="Artist"> {this.state.artistName}</p>
            <MusicPlayer togglePlay={this.togglePlay} isPlay={this.state.isPlay} nextTrack={this.nextTrack} prevTrack={this.prevTrack}/>
          </div>
          {/* <LanguageSelect className ="LanguageSelectPlayer"/> */}
          <Script
            url="https://sdk.scdn.co/spotify-player.js"
          />
        </div>
        <div className="LyricBox">
          <LyricBox lyrics={this.state.songLyrics} title={this.state.displayTrackName} artist={this.state.displayArtistName}/>
        </div>
      </div>
    )   
  }
} 

export default PlayPage;