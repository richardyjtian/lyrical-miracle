import React from 'react';
import Box from '@material-ui/core/Box';

class LyricBox extends React.Component{
  
  render(){
      return(
        <Box  m={1} border={1} borderColor="primary.main" borderRadius={16}>
          <h2>{this.props.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: this.props.lyrics}}></p>
        </Box>
      )   
  }

}export default LyricBox;