import React from 'react';
import TextField from '@material-ui/core/TextField';
import FieldBasic, { FieldProto, FieldComponentGenerator } from '../../../types/Field';

export default ({
  name,
  label,
  updateField,
  value = '',
  optionsValues = {}
}: (FieldProto | FieldBasic) & FieldComponentGenerator): JSX.Element => {
  const onChange = (e: React.ChangeEvent): void => {
    updateField({
      [name]: (e.target as HTMLInputElement & { value: string }).value
    });
  };

  const {
    name: nameVal,
    defaultValue,
    placeholder,
    type,
    isDisabled,
    helperText,
    label: labelVal
  } = optionsValues;

  return (
    <TextField
      defaultValue={defaultValue || value}
      name={nameVal}
      fullWidth
      label={labelVal || label}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      disabled={isDisabled}
      helperText={helperText}
    />
  );
};
