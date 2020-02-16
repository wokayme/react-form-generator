import React from 'react';
import Box from '@material-ui/core/Box';
import { useDrop, DragObjectWithType } from 'react-dnd';
import FilterNoneOutlinedIcon from '@material-ui/icons/FilterNoneOutlined';
import AddToPhotosOutlinedIcon from '@material-ui/icons/AddToPhotosOutlined';
import Typography from '@material-ui/core/Typography';
import FieldList from './FieldList';
import fieldsJSON from '../Predefined/fieldsTypes';
import FormJson from '../../types/FormJson';
import { FieldType } from '../../types/consts';

const style = {
  dragMessage: {
    color: '#bfbfbf',
    padding: '50px',
    border: '2px dashed #bfbfbf',
    textAlign: 'center',
    borderRadius: '20px'
  } as React.CSSProperties,
  dragMessageActive: {
    color: '#7f7f7f',
    border: '2px dashed #7f7f7f'
  } as React.CSSProperties,
  dragMessageIcon: {
    fontSize: '90px'
  } as React.CSSProperties
};

export default function Creator({
  formJson,
  setFormJson
}: {
  formJson: FormJson;
  setFormJson: Function;
}): JSX.Element {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'field',
    drop: ({ fieldType }: DragObjectWithType & { fieldType: FieldType }) => {
      const fieldToAdded = { ...fieldsJSON.find(field => field.fieldType === fieldType) };

      setFormJson([...formJson, fieldToAdded]);

      return { name: 'Dustbin' };
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const isActive = canDrop && isOver;

  return (
    <Box>
      {formJson.length === 0 &&
        drop(
          <div>
            <Box
              style={
                !isActive ? style.dragMessage : { ...style.dragMessage, ...style.dragMessageActive }
              }
            >
              <span id="client-snackbar">
                {isActive ? (
                  <>
                    <AddToPhotosOutlinedIcon style={style.dragMessageIcon} />

                    <Typography variant="h4" gutterBottom>
                      Drop fields here
                    </Typography>
                  </>
                ) : (
                  <>
                    <FilterNoneOutlinedIcon style={style.dragMessageIcon} />

                    <Typography variant="h4" gutterBottom>
                      Drag fields here
                    </Typography>
                  </>
                )}
              </span>
            </Box>
          </div>
        )}
      <FieldList formJson={formJson} setFormJson={setFormJson} />
    </Box>
  );
}
