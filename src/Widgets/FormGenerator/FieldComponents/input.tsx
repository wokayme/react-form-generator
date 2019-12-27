import React, { useState, Fragment, useCallback } from 'react'
import TextField from '@material-ui/core/TextField';
import Field from '../../../types/Field';

export default ({name, label, type, updateField, value=''}: Field & {updateField: Function}) => {

    const onChange = (e: React.ChangeEvent)=>{
        updateField({
            [name]: (e.target as HTMLInputElement & {value: string}).value
        })
    }

    return <TextField defaultValue={value} fullWidth label={label} onChange={onChange} />
}