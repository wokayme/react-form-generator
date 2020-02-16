import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Input from './FieldComponents/input';
import Switch from './FieldComponents/switch';
import Select from './FieldComponents/select';
import { FieldType } from '../../types/consts';
import FormJson from '../../types/FormJson';

export default function PreviewGenerator({ formJson }: { formJson: FormJson }): JSX.Element {
  const [dataExample, updateField] = useState([]);
  return (
    <List>
      {formJson.map((field, index) => {
        return (
          <ListItem key={index}>
            {field.fieldType === FieldType.Input && <Input {...field} updateField={updateField} />}
            {field.fieldType === FieldType.Switch && (
              <Switch {...field} updateField={updateField} />
            )}
            {field.fieldType === FieldType.Select && (
              <Select {...field} updateField={updateField} />
            )}
          </ListItem>
        );
      })}
    </List>
  );
}
