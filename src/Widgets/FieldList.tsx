import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Field from './Field';
import fieldsJSON from './Predefined/fieldsTypes';

export default function FieldList(): JSX.Element {
  return (
    <List>
      {fieldsJSON.map((field, index) => (
        <Fragment key={field.fieldType}>
          <Field field={field} />
          {fieldsJSON.length - 1 !== index && <Divider />}
        </Fragment>
      ))}
    </List>
  );
}
