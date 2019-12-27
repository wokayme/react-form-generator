import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Field from './Field';
import FormJson from '../../types/FormJson';
import { OptionsValues } from '../../types/Field';

export default function FieldList({
  formJson,
  setFormJson
}: {
  formJson: FormJson;
  setFormJson: Function;
}): JSX.Element | null {
  const updateField = (index: number) => (options: OptionsValues): void => {
    const newFormJson = [...formJson];
    newFormJson[index].optionsValues = {
      ...newFormJson[index].optionsValues,
      ...options
    };
    setFormJson(newFormJson);
  };

  return formJson.length > 0 ? (
    <List>
      {formJson.map((field, index) => (
        <Fragment key={index}>
          <Field
            field={field}
            index={index}
            setFormJson={setFormJson}
            formJson={formJson}
            updateField={updateField(index)}
          />
          {formJson.length - 1 !== index && <Divider />}
        </Fragment>
      ))}
    </List>
  ) : null;
}
