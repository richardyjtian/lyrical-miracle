import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './LanguageSelect.css';

class LanguangeSelect extends React.Component{
  render(){
      return(
          <Select
            labelId="Language"
            label = "Language"
            id="languangeSelect"
            className = "LanguageSelect"
          >
            <MenuItem value={10}>English</MenuItem>
            <MenuItem value={20}>Spanish</MenuItem>
            <MenuItem value={30}>Japanese</MenuItem>
            <MenuItem value={40}>Italian</MenuItem>
            <MenuItem value={50}>Korean</MenuItem>
            <MenuItem value={60}>French</MenuItem>
          </Select>
      )   
  }

}export default LanguangeSelect;