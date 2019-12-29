import React from 'react';
import TextField from '@material-ui/core/TextField';
import { FieldProto } from '../../../types/Field';

export default ({
  name,
  label,
  updateField,
  value = ''
}: FieldProto & { updateField: Function }): JSX.Element => {
  const onChange = (e: React.ChangeEvent): void => {
    updateField({
      [name]: (e.target as HTMLInputElement & { value: string }).value
    });
  };

  return <TextField defaultValue={value} fullWidth label={label} onChange={onChange} />;
};
