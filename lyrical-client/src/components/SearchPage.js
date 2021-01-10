import React from 'react';
import SearchBar from './Search/SearchBar.js'
import LanguageSelect from './Search/LanguageSelect.js'
import SearchResult from './Search/SearchResult.js'
import './SearchPage.css';

class SearchPage extends React.Component{
  render(){
      return(
        <div classNane = "SearchPage">
          <div className="SongSearch">
            <SearchBar/>
            <LanguageSelect/>
          </div>
          <SearchResult/>
        </div>
      )   
  }

}export default SearchPage;