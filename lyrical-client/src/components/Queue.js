import React from 'react';
import Box from '@material-ui/core/Box';
import './Queue.css';

class Queue extends React.Component{
  render(){
      return(
        <Box m={1} border={3} borderColor="#D6C4A9" borderRadius={44} className = "Queue">
          <h2>Queue here</h2>
        </Box>
      )   
  }

}export default Queue;