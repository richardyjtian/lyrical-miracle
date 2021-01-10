import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

class SearchPage extends React.Component{
  render(){
      return(
        <form noValidate autoComplete="off">
          <TextField id="standard-basic" label="Search" />
          <IconButton aria-label="Search" className="SearchButton">
            <SearchIcon/>
          </IconButton>
        </form>  
      )   
  }

}export default SearchPage;