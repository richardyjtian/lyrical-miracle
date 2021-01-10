import React from 'react';
import LanguageSelect from './Search/LanguageSelect.js'
import LyricBox from './Play/LyricBox.js'
import MusicPlayer from './Play/MusicPlayer.js'
import './PlayPage.css';


class PlayPage extends React.Component{
  render(){
      return(
        <div className="PlayPage">
          <div className="PlayingSong">
            <div className="AlbumCover">
              <img src="https://i.pinimg.com/originals/b4/75/00/b4750046d94fed05d00dd849aa5f0ab7.jpg" width="128" height="128"></img>
            </div>
            <div className ="SongAndPlayer">
              <p className ="SongTitle"> Song Title</p>
              <p className ="Artist"> Artist </p>
              <MusicPlayer/>
            </div>
            <LanguageSelect className ="LanguageSelectPlayer"/>
          </div>
          <LyricBox/>
        </div>
      )   
  }

}export default PlayPage;