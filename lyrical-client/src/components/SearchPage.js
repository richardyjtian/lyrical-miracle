import React from 'react';
import SearchBar from './Search/SearchBar.js'
import LanguageSelect from './Search/LanguageSelect.js'
import SearchResult from './Search/SearchResult.js'

class SearchPage extends React.Component{
  render(){
      return(
        <div className="SongSearch">
          <SearchBar/>
          <LanguageSelect/>
          <h3>Results</h3>
          <SearchResult/>
        </div>
      )   
  }

}export default SearchPage;