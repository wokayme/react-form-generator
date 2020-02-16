import React, { useState, Fragment, useCallback } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FieldBasic, { FieldProto } from '../../../types/Field';

export default ({
  name,
  label,
  updateField,
  value = ''
}: (FieldProto | FieldBasic) & { updateField: Function }) => {
  const [checked, setCheck] = React.useState(value);

  const handleChange = event => {
    setCheck(event.target.checked);
    updateField({ [name]: event.target.checked });
  };
  return (
    <FormControlLabel
      control={
        <Switch checked={checked} onChange={handleChange} value="checkedB" color="primary" />
      }
      label={label}
    />
  );
};
