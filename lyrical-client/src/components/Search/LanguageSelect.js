import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class LanguangeSelect extends React.Component{
  render(){
      return(
          <Select
            labelId="Language"
            id="languangeSelect"
          >
            <MenuItem value={10}>English</MenuItem>
            <MenuItem value={20}>Spanish</MenuItem>
            <MenuItem value={30}>Japanese</MenuItem>
          </Select>
      )   
  }

}export default LanguangeSelect;