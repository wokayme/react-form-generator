import React, { useState, Fragment, useCallback } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Field from '../../../types/Field';

export default ({name, label, type, updateField, value='', options=[]} : Field & {updateField: Function} ) => {

    const onChange = (e: React.ChangeEvent)=>{
        updateField({
            [name]: (e.target as HTMLInputElement & {value: string}).value
        })
    }

    return (
    <>
<InputLabel id="demo-simple-select-label">{label}</InputLabel>
    <Select
    fullWidth
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={value ? value : ''}
    onChange={onChange}
  >
      {options.map(({label, value}, index)=>(
        <MenuItem key={index} value={value}>{label}</MenuItem>
      ))}
  </Select>
  </>)
}