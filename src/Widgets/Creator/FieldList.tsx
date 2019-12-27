import React, { useState, Fragment } from 'react'
import List from '@material-ui/core/List';
import Field from './Field'
import Divider from '@material-ui/core/Divider';


export default function FieldList({formJson, setFormJson}){



  const updateField = (index: number) => (options) => {
    const newFormJson = [...formJson];
    newFormJson[index].optionsValues = {
      ...newFormJson[index].optionsValues,
      ...options
    };
    setFormJson(newFormJson);
  }

    return formJson.length > 0 ?
        <List>
            {formJson.map((field, index)=>
                <Fragment key={index}>
                    <Field  field={field} index={index} setFormJson={setFormJson} formJson={formJson} updateField={updateField(index)} />
                    {formJson.length-1!==index && <Divider />}
                </Fragment>
            )}
        </List> : null
}