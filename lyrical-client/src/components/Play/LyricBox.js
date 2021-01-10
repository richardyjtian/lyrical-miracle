import React from 'react';
import Box from '@material-ui/core/Box';

class LyricBox extends React.Component{
  render(){
      return(
        <Box  m={1} border={1} borderColor="primary.main" borderRadius={16}>
          <h2>Sample Lyric</h2>
          <p>
          I've been awake for a while now
          You've got me feeling like a child now
          'Cause every time I see your bubbly face
          I get the tinglies in a silly place
          It starts in my toes
          Makes me crinkle my nose
          Wherever it goes
          I always know
          You make me smile
          Please stay for a while now
          Just take your time
          Wherever you go
          The rain is falling on my window pane
          But we are hiding in a safer place
          Under covers staying dry and warm
          You give me feelings that I adore
          They start in my toes
          Make me crinkle my nose
          Wherever it goes
          I always know
          You make me smile
          Please stay for a while now
          Just take your time
          Wherever you go
          But what am I gonna say
          When you make me feel this way?
          I just, hmm
          And it starts in my toes
          Makes me crinkle my nose
          Wherever it goes
          I always know
          You make me smile
          Please…
          </p>
        </Box>
      )   
  }

}export default LyricBox;