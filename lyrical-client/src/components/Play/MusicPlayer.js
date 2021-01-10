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
  render(){
      return(
        <div>
          <Box  m={1} border={1} borderColor="white" borderRadius={16} className="musicPlayerBox">
            <IconButton aria-label="Shuffle" className="Shuffle">
              <ShuffleIcon />
            </IconButton>  
            <IconButton aria-label="SkipPrevious" className="SkipPrevious">
              <SkipPreviousIcon fontSize="large"/>
            </IconButton>
            <IconButton aria-label="PlayPause" className="PlayPause">
              <PlayCircleOutlineIcon fontSize="large"/>
            </IconButton>
            <IconButton aria-label="SkipNext" className="SkipNext">
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