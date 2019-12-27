import React, { useState, Fragment, useCallback } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Field from '../../../types/Field';

export default ({name, label, type}: Field & {updateField: Function}) => {
    const [state, setState] = React.useState({
      checkedA: true,
      checkedB: true,
    });
  
    // const handleChange = name => event => {
    //   setState({ ...state, [name]: event.target.checked });
    // };
    return <FormControlLabel
      control={
        <Switch
          checked={state.checkedB}
          // onChange={handleChange('checkedB')}
          value="checkedB"
          color="primary"
        />
      }
      label={label}
    />
}