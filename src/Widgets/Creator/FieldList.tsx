import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { OptionsValues } from '../../types/Field';
import FormJson from '../../types/FormJson';
import Field from './Field';

export default function FieldList({
  formJson,
  setFormJson
}: {
  formJson: FormJson;
  setFormJson: Function;
}): JSX.Element | null {
  const updateField = (index: number) => (options: OptionsValues): void => {
    const newFormJson = [...formJson];
    newFormJson[index].optionsValues = {
      ...newFormJson[index].optionsValues,
      ...options
    } as OptionsValues;
    setFormJson(newFormJson);
  };
  const [open, setOpen] = React.useState(false);
  const [indexToDelete, setIndexToDelete] = React.useState<number | undefined>(undefined);

  const openDeleteDialog = (index: number): Function => (): void => {
    setIndexToDelete(index);
    setOpen(true);
  };

  const closeDeleteDialog = (): void => {
    setOpen(false);
  };

  const deleteField = (index?: number): void => {
    if (typeof index !== 'number' || !formJson[index]) return;
    const newFormJson = formJson.slice(0, index).concat(formJson.slice(index + 1));
    setFormJson(newFormJson);
    setOpen(false);
  };

  return formJson.length > 0 ? (
    <List>
      <Dialog open={open} onClose={closeDeleteDialog}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>You will not be able to revert this.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={(): void => deleteField(indexToDelete)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {formJson.map((field, index) => (
        <Fragment key={index}>
          <Field
            openDeleteDialog={openDeleteDialog(index)}
            field={field}
            index={index}
            setFormJson={setFormJson}
            formJson={formJson}
            updateField={updateField(index)}
          />
          {formJson.length - 1 !== index && <Divider />}
        </Fragment>
      ))}
    </List>
  ) : null;
}
