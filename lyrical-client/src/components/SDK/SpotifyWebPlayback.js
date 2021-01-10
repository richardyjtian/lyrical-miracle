window.onSpotifyWebPlaybackSDKReady = () => {
  const token = 'BQDb3GsOUIffvLs0ezWbeHcl-F1QDBUaaQ_Zq2W0EkaYcR39_kuUp28D_CugoQfWxJ6KOPhZVnBrR1J4X1mj9u9HntKalaNHQM-n4SMqjOLwe3Cl_jJAWGf9q3Hg_fsjGiwU4x71oUsybWnIzBbNToz6MUQmNdg';
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); }
  });

  // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });

  var track_name = "";
  // Playback status updates
  player.addListener('player_state_changed', state => { 
    console.log(state);
    var title = document.getElementById('title');
    var cur_track_name = state.track_window.current_track.name;
    if (track_name != cur_track_name) {
      track_name = cur_track_name;
      var cur_artist_name = state.track_window.current_track.artists[0].name;
      var genius_json_rsp = httpGetGeniusSearch(track_name, cur_artist_name);
      var hits = genius_json_rsp['response']['hits'];
      var song;
      for (i in hits) {
        var hit = hits[i];
        if (cur_artist_name.toLowerCase() == hit['result']['primary_artist']['name'].toLowerCase()) {
          song = hit;
          console.log(JSON.stringify(song, null, 2))
          break;
        }
      }
      if (song != null) {
        song_url = song['result']['url'];
        let webpage = httpGetGeniusLyrics(song_url);
        const parser = new DOMParser()
        let lyrics = parser.parseFromString(webpage, "text/html").getElementsByClassName("lyrics")[0].innerHTML;
        const a_open_regex = /<a([\s\S]*?)>/g;
        const a_close_regex = /<\/a>/g;
        lyrics = lyrics.replaceAll(a_open_regex, '').replaceAll(a_close_regex, '')
        title.innerHTML = track_name + lyrics;
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
};

function httpGetGeniusSearch(song_title, artist_name)
{
  let url = 'https://api.genius.com/'
  url += 'search?q=' + song_title + ' ' + artist_name;
  url += '&access_token=' + 'cPKFxtDU8V0FpvPIxPOBNwivf1yBjgIWibojAcaam5e4fDVnmmsC0s_QaphnkvnS'
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false ); // false for synchronous request
  xmlHttp.send();
  return JSON.parse(xmlHttp.responseText);
}

function httpGetGeniusLyrics(url)
{
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  url = proxyurl + url
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, false ); // false for synchronous request
  xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*')
  xmlHttp.send();
  return xmlHttp.responseText;
}