import React, { useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDrag, DragSourceMonitor } from 'react-dnd';

export default function Field({field}){
    const name = field.name
    const [{ isDragging }, drag] = useDrag({
        item: { name, type: 'box' },
        end: (item: { name: string } | undefined, monitor: DragSourceMonitor) => {
          const dropResult = monitor.getDropResult()
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