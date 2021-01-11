import React from 'react';
import SearchBar from '../Search/SearchBar'
import LanguageSelect from '../Search/LanguageSelect'
import SearchResult from '../Search/SearchResult'
import './SearchPage.css';

class SearchPage extends React.Component{
  render() {
    return(
      <div className = "SearchPage">
        <div className="SongSearch">
          <SearchBar/>
          <LanguageSelect/>
        </div>
        <SearchResult/>
      </div>
    )   
  }
}

export default SearchPage;