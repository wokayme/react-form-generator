import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from './FieldComponents/input';
import Switch from './FieldComponents/switch';
import Select from './FieldComponents/select';
import { FieldType } from '../../types/consts';
import { FormJsonOptions } from '../../types/FormJson';
import { OptionsValues } from '../../types/Field';

const style = {
  background: 'rgba(0,0,0,0.05)',
  borderRadius: '5px',
  paddingBottom: '15px'
} as React.CSSProperties;

export default function FormGenerator({
  fieldList,
  updateField,
  fieldListValues
}: {
  fieldList: FormJsonOptions;
  updateField: Function;
  fieldListValues?: OptionsValues;
}): JSX.Element {
  return (
    <Grid container spacing={3} style={style}>
      {fieldList.map(field => {
        // @ts-ignore: Element implicitly has an 'any' type
        const value = fieldListValues ? (fieldListValues[field.name] as string) : '';
        return (
          <Grid item xs={4} key={field.name}>
            {field.typeField === FieldType.Input && (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <Input {...field} value={value} updateField={updateField} />
            )}
            {field.typeField === FieldType.Switch && (
              <Switch {...field} value={value} updateField={updateField} />
            )}
            {field.typeField === FieldType.Select && (
              <Select {...field} value={value} updateField={updateField} />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
}
