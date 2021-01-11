import React from 'react';
import Box from '@material-ui/core/Box';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import './MusicPlayer.css';

class MusicPlayer extends React.Component{
  constructor(props){
    super(props);
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
  }

  handleTogglePlay(){
    this.props.togglePlay();
  }

  render(){
    const isPlay = this.props.isPlay;
    let playButton;
    if (isPlay) {
      playButton = <PlayCircleOutlineIcon fontSize="large"/>;
    } else {
      playButton = <PauseCircleOutlineIcon fontSize="large"/>;
    }
      return(
        <div>
          <Box className="musicPlayerBox"
              m={1} border={1} 
              borderColor="white" borderRadius={16} 
              display="flex" flexDirection="row"
          >
            <IconButton aria-label="Shuffle" className="Shuffle">
              <ShuffleIcon />
            </IconButton>  
            <IconButton aria-label="SkipPrevious" className="SkipPrevious" onClick={this.props.prevTrack}>
              <SkipPreviousIcon fontSize="large"/>
            </IconButton>
            <IconButton aria-label="PlayPause" className="PlayPause" onClick={this.handleTogglePlay}>
              {playButton}
            </IconButton>
            <IconButton aria-label="SkipNext" className="SkipNext" onClick={this.props.nextTrack}>
              <SkipNextIcon fontSize="large"/>
            </IconButton>
            <IconButton aria-label="Repeat" className="Repeat">
              <RepeatIcon/>
            </IconButton>          
          </Box>
        </div>
      )   
  }

}export default MusicPlayer;