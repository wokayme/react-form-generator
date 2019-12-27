import React from 'react';
import TextField from '@material-ui/core/TextField';
import Field from '../../../types/Field';

export default ({
  name,
  label,
  updateField,
  value = ''
}: Field & { updateField: Function }): JSX.Element => {
  const onChange = (e: React.ChangeEvent): void => {
    updateField({
      [name]: (e.target as HTMLInputElement & { value: string }).value
    });
  };

  return <TextField defaultValue={value} fullWidth label={label} onChange={onChange} />;
};
