import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDrop, DragObjectWithType, useDrag, DragSourceMonitor } from 'react-dnd';
import Box from '@material-ui/core/Box';

import FilterNoneOutlinedIcon from '@material-ui/icons/FilterNoneOutlined';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import fieldsJSON from '../Predefined/fieldsTypes';
import FormGenerator from '../FormGenerator/FormGenerator';
import Field from '../../types/Field';
import FormJson from '../../types/FormJson';
import { FieldType } from '../../types/consts';

const style = {
  placeholder: {
    color: '#bfbfbf',
    padding: '20px',
    border: '2px dashed #bfbfbf',
    textAlign: 'center',
    borderRadius: '20px'
  } as React.CSSProperties,
  dragMessageIcon: {
    fontSize: '40px'
  } as React.CSSProperties,
  iconsAction: {
    marginRight: '8px'
  } as React.CSSProperties
};

type DraggedField = DragObjectWithType & { fieldType: FieldType; moveIndex: number };

export default function FieldComponent({
  field,
  setFormJson,
  formJson,
  index,
  updateField,
  openDeleteDialog
}: {
  field: Field;
  setFormJson: Function;
  formJson: FormJson;
  index: number;
  updateField: Function;
  openDeleteDialog: Function;
}): JSX.Element {
  const [isTheSame, isTheSameUpdate] = useState(false);
  const [isOpen, changeOpenStatus] = useState(false);

  const [{ isOver }, drop] = useDrop({
    accept: 'field',
    drop: ({ fieldType: fieldName, moveIndex }: DraggedField) => {
      if (moveIndex === index) {
        return;
      }

      const newFormJson = [...formJson];
      if (moveIndex !== undefined) {
        newFormJson.splice(index, 0, newFormJson.splice(moveIndex, 1)[0]);
      } else {
        newFormJson.splice(index + 1, 0, {
          ...((fieldsJSON.find(
            prototypeField => prototypeField.fieldType === fieldName
          ) as unknown) as Field)
        });
      }
      setFormJson(newFormJson);

      return {};
    },
    hover: ({ moveIndex }: DraggedField) => {
      isTheSameUpdate(moveIndex === index);
    },
    collect: monitor => {
      if (monitor.isOver()) changeOpenStatus(false);

      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      };
    }
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'field', moveIndex: index },
    end: (item: { moveIndex: number; type: string } | undefined, monitor: DragSourceMonitor) => {
      monitor.getDropResult();
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0.4 : 1;

  const listLabel = field?.optionsValues?.label ? field?.optionsValues.label : field?.fieldLabel;
  const listSecondLabel = field?.optionsValues?.label ? field?.fieldLabel : '';

  return (
    <>
      <div
        ref={(...arg): void => {
          drag(...arg);
          drop(...arg);
        }}
      >
        <ListItem style={{ opacity }}>
          <ListItemText primary={listLabel} secondary={listSecondLabel} />
          <IconButton
            size="small"
            style={style.iconsAction}
            onClick={(): void => {
              openDeleteDialog();
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
          <Button
            onClick={(): void => changeOpenStatus(!isOpen)}
            variant="outlined"
            size="small"
            color="primary"
            endIcon={isOpen ? <ExpandLess /> : <ExpandMore />}
          >
            Edit
          </Button>
        </ListItem>
        {isOver && !isTheSame && (
          <Box style={style.placeholder}>
            <FilterNoneOutlinedIcon style={style.dragMessageIcon} />

            <Typography variant="h5" gutterBottom>
              Drop field here
            </Typography>
          </Box>
        )}
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Divider />
          <ListItem>
            <FormGenerator
              fieldList={field.options}
              fieldListValues={field?.optionsValues}
              updateField={updateField}
            />
          </ListItem>
        </Collapse>
      </div>
    </>
  );
}
