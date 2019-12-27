import React, { useState, Fragment } from 'react'
import List from '@material-ui/core/List';
import Field from './Field'
import Divider from '@material-ui/core/Divider';
import fieldsJSON from './Predefined/fieldsTypes'

export default function FieldList(){
    return <>
        <List>
            {fieldsJSON.map((field, index)=>
                <Fragment key={field.name}>
                    <Field field={field} />
                    {fieldsJSON.length-1!==index && <Divider />}
                </Fragment>
            )}
        </List>
    </>
}