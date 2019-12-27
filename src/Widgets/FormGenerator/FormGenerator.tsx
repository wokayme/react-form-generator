import React from 'react'
import Input from './FieldComponents/input';
import Switch from './FieldComponents/switch';
import Select from './FieldComponents/select';
import {FieldType} from '../../types/consts'
import FormJson from './../../types/FormJson'
import {OptionsValues} from './../../types/Field'

import Grid from '@material-ui/core/Grid';

export default function FormGenerator({fieldList , updateField, fieldListValues}: {fieldList: FormJson, updateField: Function, fieldListValues?: OptionsValues}){
    return <Grid container spacing={3}>
        {fieldList.map((field)=>{
            const value = fieldListValues ? fieldListValues[field.name] : ''; 
        return(
            <Grid item xs={4} key={field.name}>
                {field.type === FieldType.Input && <Input {...field} value={value} updateField={updateField} />}
                {field.type === FieldType.Switch && <Switch {...field} value={value} updateField={updateField} />}
                {field.type === FieldType.Select && <Select {...field} value={value} updateField={updateField} />}
            </Grid>
        )})}
    </Grid>
}