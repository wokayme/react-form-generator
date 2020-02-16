import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FieldBasic, { FieldProto, FieldComponentGenerator } from '../../../types/Field';

export default ({
  name,
  label,
  updateField,
  value = ''
}: (FieldProto | FieldBasic) & FieldComponentGenerator): JSX.Element => {
  const [checked, setCheck] = React.useState<boolean>(!!value);

  const handleChange = (event: React.ChangeEvent): void => {
    const eventIsChecked = (event.target as HTMLInputElement & { checked: boolean }).checked;
    setCheck(eventIsChecked);
    updateField({
      [name]: eventIsChecked
    });
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
