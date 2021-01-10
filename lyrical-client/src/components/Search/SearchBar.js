import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import './SearchBar.css';

class SearchPage extends React.Component{
  render(){
      return(
        <form noValidate autoComplete="off" className ="SearchBar">
          <TextField id="standard-basic" label="Search" />
          <IconButton aria-label="Search" className="SearchButton">
            <SearchIcon/>
          </IconButton>
        </form>  
      )   
  }

}export default SearchPage;