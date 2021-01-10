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
    this.state = {
      isPlay: true,
    }
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
  }

  handleTogglePlay(){
    this.setState({isPlay: !this.state.isPlay})
    this.props.togglePlay();
  }

  render(){
    const isPlay = this.state.isPlay;
    let playButton;
    if (isPlay) {
      playButton = <PlayCircleOutlineIcon fontSize="large"/>;
    } else {
      playButton = <PauseCircleOutlineIcon fontSize="large"/>;
    }
      return(
        <div>
          <Box  m={1} border={1} borderColor="white" borderRadius={16} className="musicPlayerBox">
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