import React from 'react';
import LanguageSelect from './Search/LanguageSelect.js'
import LyricBox from './Play/LyricBox.js'
import MusicPlayer from './Play/MusicPlayer.js'

class PlayPage extends React.Component{
  render(){
      return(
        <div className="PlayPage">
          <div className="PlayingSong">
            <MusicPlayer/>
            <p>Lyrics for: Some song</p>
            <p>Artist: Rico</p>
            <LanguageSelect/>
          </div>
          <LyricBox/>
        </div>
      )   
  }

}export default PlayPage;