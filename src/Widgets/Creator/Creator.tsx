import React, { useState } from 'react'
import Box from '@material-ui/core/Box';
import { useDrop } from 'react-dnd'
import FilterNoneOutlinedIcon from '@material-ui/icons/FilterNoneOutlined';
import AddToPhotosOutlinedIcon from '@material-ui/icons/AddToPhotosOutlined';
import Typography from '@material-ui/core/Typography';
import FieldList from './FieldList';
import fieldsJSON from '../Predefined/fieldsTypes';

const style = {
  listContainer:{
    padding: '20px'
  },
  dragMessage: {
    color: '#bfbfbf',
    padding: "50px",
    border: "2px dashed #bfbfbf",
    textAlign: 'center',
    borderRadius: "20px"
  },
  dragMessageActive: {
    color: '#7f7f7f',
    border: "2px dashed #7f7f7f",
  },
  dragMessageIcon: {
    fontSize: "90px",
  },
}

export default function Creator({formJson, setFormJson}){

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'box',
    drop: ({name: fieldName}) => {
      console.log(fieldName)
      console.log(fieldsJSON.find((field)=>field.name===fieldName))

      const fieldToAdded = {...fieldsJSON.find((field)=>field.name===fieldName)}
      
      setFormJson(
        [
          ...formJson,
          fieldToAdded
        ]
      )
      
      return ({ name: 'Dustbin' })
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })


  const isActive = canDrop && isOver
  let backgroundColor = '#fff'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

    return <>
      <Box style={style.listContainer}>
          {Object.values(formJson).length === 0 && 
          <Box
          ref={drop} style={!isActive ? style.dragMessage : {...style.dragMessage, ...style.dragMessageActive}}
          >
            <span id="client-snackbar" >
            {isActive ? <>
                <AddToPhotosOutlinedIcon style={style.dragMessageIcon}/>

                <Typography variant="h4" gutterBottom>
                  Drop fields here
                </Typography>
              </> : <>
                <FilterNoneOutlinedIcon style={style.dragMessageIcon}/>

                <Typography variant="h4" gutterBottom>
                  Drag fields here
                </Typography>
              </>}
            </span>
        </Box>
        }
        <FieldList formJson={formJson} setFormJson={setFormJson} />
      </Box>
    </>
}