import React, { useState, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Box from '@material-ui/core/Box';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FieldBasic, { FieldProto, FieldComponentGenerator, RadioValue } from '../../../types/Field';

const style = {
  legend: {
    marginBottom: '8px'
  } as React.CSSProperties,
  label: {
    display: 'flex',
    marginBottom: '8px',
    alignItems: 'center'
  } as React.CSSProperties,
  editBox: {
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(0, 0, 0, 0.05)',
    padding: '10px',
    alignItems: 'flex-start'
  } as React.CSSProperties,
  editInput: {
    width: '100%'
  } as React.CSSProperties,
  saveButton: {
    marginTop: '5px',
    marginRight: '5px'
  } as React.CSSProperties,
  skipButton: {
    marginTop: '5px'
  } as React.CSSProperties,
  icon: {
    marginLeft: 'auto'
  } as React.CSSProperties,
  iconAdd: {
    marginLeft: 'auto',
    color: '#4BAF50'
  } as React.CSSProperties
};

export default ({
  name: nameOption,
  label,
  updateField,
  value = []
}: (FieldProto | FieldBasic) &
  FieldComponentGenerator & { value: Array<RadioValue> }): JSX.Element => {
  const [list, setList] = useState<Array<RadioValue>>(value);
  const [editFieldIndex, setEditFieldIndex] = useState<null | number>(null);
  const [editName, setEditName] = useState<string>('');
  const [editLabel, setEditLabel] = useState<string>('');
  const [editDefault, setEditDefault] = useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  const maxSelect = 1;
  const editFunction = (
    index: number,
    label: string,
    name: string,
    defaultSelected: boolean
  ): void => {
    const newList = [...list];
    newList[index] = {
      label,
      name,
      defaultSelected
    };

    const countSelected = newList.reduce(
      (val, { defaultSelected }) => val + (defaultSelected ? 1 : 0),
      0
    );

    if (countSelected > maxSelect) {
      setOpen(true);
    }

    setEditFieldIndex(null);
    setList(newList);
    updateField({
      [nameOption]: newList
    });
  };

  const closeDeleteDialog = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={closeDeleteDialog}>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Two options are selected, radio buttons should have only one option
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Ok, I understand
          </Button>
        </DialogActions>
      </Dialog>
      <FormLabel component="legend" style={style.legend}>
        {label}
      </FormLabel>
      {([...list, {}] as Array<RadioValue>).map(({ label, name, defaultSelected }, index) => (
        <Fragment key={index}>
          {editFieldIndex !== index ? (
            <Box style={style.label}>
              {index === list.length ? (
                <>
                  Add new
                  <AddCircleIcon
                    style={style.iconAdd}
                    onClick={(): void => {
                      setEditFieldIndex(index);
                      setEditLabel('');
                      setEditName('');
                      setEditDefault(false);
                    }}
                  />
                </>
              ) : (
                <>
                  {`${label}${defaultSelected && ' (Selected)'}`}
                  <EditIcon
                    style={style.icon}
                    onClick={(): void => {
                      setEditFieldIndex(index);
                      setEditLabel(label);
                      setEditName(name);
                      setEditDefault(defaultSelected);
                    }}
                  />
                </>
              )}
            </Box>
          ) : (
            <Box style={style.editBox}>
              <TextField
                label="Label"
                style={style.editInput}
                value={editLabel}
                onChange={(e: React.ChangeEvent): void => {
                  setEditLabel((e.target as HTMLInputElement & { value: string }).value);
                }}
              />
              <TextField
                label="Name"
                value={editName}
                style={style.editInput}
                onChange={(e: React.ChangeEvent): void => {
                  setEditName((e.target as HTMLInputElement & { value: string }).value);
                }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={editDefault}
                    onChange={(): void => {
                      setEditDefault(!editDefault);
                    }}
                  />
                }
                label="Default selected"
              />
              <Box>
                <Button
                  style={style.saveButton}
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<SaveIcon />}
                  onClick={(): void => {
                    editFunction(index, editLabel, editName, editDefault);
                  }}
                >
                  Save
                </Button>
                <Button
                  style={style.skipButton}
                  size="small"
                  onClick={(): void => {
                    setEditFieldIndex(null);
                    setEditLabel('');
                    setEditName('');
                  }}
                >
                  Skip changes
                </Button>
              </Box>
            </Box>
          )}
        </Fragment>
      ))}
    </>
  );
};
