import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDrag } from 'react-dnd';
import { PredefinedField } from '../types/Field';

export default function Field({ field }: { field: PredefinedField }): JSX.Element {
  const fieldType = field.fieldType;
  const [{ isDragging }, drag] = useDrag({
    item: { fieldType, type: 'field' },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0.4 : 1;

  return (
    <ListItem ref={drag} style={{ opacity }}>
      <ListItemText primary={field.fieldLabel} />
    </ListItem>
  );
}
