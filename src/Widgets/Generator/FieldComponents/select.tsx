import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FieldBasic, { FieldProto } from '../../../types/Field';

export default ({
  name,
  label,
  updateField,
  value = '',
  options = []
}: (FieldProto | FieldBasic) & { updateField: Function; label: string }): JSX.Element => {
  const onChange = (e: React.ChangeEvent): void => {
    updateField({
      [name]: (e.target as HTMLInputElement & { value: string }).value
    });
  };

  return (
    <>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        fullWidth
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value || ''}
        onChange={onChange}
      >
        {options.map(({ label: optionLabel, value: optionValue }) => (
          <MenuItem key={optionLabel} value={optionValue}>
            {optionLabel}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
