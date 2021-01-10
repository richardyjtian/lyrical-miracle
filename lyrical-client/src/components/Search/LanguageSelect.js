import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import './LanguageSelect.css';

class LanguageSelect extends React.Component{
  render(){
      return(
        <FormControl label= "Language" variant="outlined" style={{minWidth: 150}}> 
        <InputLabel id="LanguageSelector">Language</InputLabel>
          <Select>
            <MenuItem value={10}>English</MenuItem>
            <MenuItem value={20}>Spanish</MenuItem>
            <MenuItem value={30}>Japanese</MenuItem>
            <MenuItem value={40}>Italian</MenuItem>
            <MenuItem value={50}>Korean</MenuItem>
            <MenuItem value={60}>French</MenuItem>
          </Select>
        </FormControl>
      )   
  }

}export default LanguageSelect;