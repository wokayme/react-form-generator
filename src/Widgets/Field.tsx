import React, { useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import {PredefinedField} from '../types/Field';

export default function Field({field}: {field: PredefinedField}){
    const fieldType = field.name
    const [{ isDragging }, drag] = useDrag({
        item: { fieldType, type: 'field' },
        end: (item: { fieldType: PredefinedField } | undefined, monitor: DragSourceMonitor) => {
        },
        collect: monitor => ({
          isDragging: monitor.isDragging(),
        }),
      })
      const opacity = isDragging ? 0.4 : 1

    return (
        <ListItem ref={drag} style={{ opacity }}>
            <ListItemText
            primary={field.label}
            />
        </ListItem>)
}