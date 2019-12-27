import React, { useState, Fragment, useCallback } from 'react'
import TextField from '@material-ui/core/TextField';

export default ({name, label, type, updateField, value=''}) => {

    const onChange = (e)=>{
        updateField({
            [name]: e.target.value
        })
    }

    return <TextField defaultValue={value} fullWidth label={label} onChange={onChange} />
}