import React from 'react';
import TextField from '@material-ui/core/TextField';

class SearchPage extends React.Component{
  render(){
      return(
        <div className="SongSearch">
          <form noValidate autoComplete="off">
            <TextField id="standard-basic" label="Search" />
          </form>  
        </div>
      )   
  }

}export default SearchPage;