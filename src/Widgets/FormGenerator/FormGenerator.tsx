import React, { useState, Fragment, useCallback } from 'react'
import Input from './types/input';
import Switch from './types/switch';
import Select from './types/select';

import Grid from '@material-ui/core/Grid';

export default function FormGenerator({fieldList = [], updateField, fieldListValues}){
    return <>
    <Grid container spacing={3}>
        {fieldList.map((field)=>{
        const value = fieldListValues?.[field.name];
        return(
            <Grid item xs={4} key={field.name}>
                {field.type === 'input' && <Input {...field} value={value} updateField={updateField} />}
                {field.type === 'switch' && <Switch {...field} value={value} updateField={updateField} />}
                {field.type === 'select' && <Select {...field} value={value} updateField={updateField} />}
            </Grid>
        )})}
    </Grid>

    </>
}