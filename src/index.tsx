import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import WebFont from 'webfontloader';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import JSONPretty from 'react-json-pretty';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Creator from './Widgets/Creator/Creator';
import FormJson, { FormJsonLoaded } from './types/FormJson';
import FieldList from './Widgets/FieldList';
import { clearJsonOutput, parseJsonLoaded } from './Widgets/Predefined/helpers';
import PreviewGenerator from './Widgets/Generator/PreviewGenerator';

WebFont.load({
  google: {
    families: ['Roboto: 300, 400, 500, 700', 'sans-serif']
  }
});

const style = {
  listContainer: {
    padding: '20px'
  } as React.CSSProperties
};

const ReactFormCreator: React.FC<{ jsonLoad: FormJsonLoaded }> = ({ jsonLoad }) => {
  const predefinedJSON = jsonLoad ? parseJsonLoaded(jsonLoad) : [];
  const [tabIndex, setTabIndex] = React.useState<number>(0);
  const [formJson, setFormJson] = React.useState<FormJson>(predefinedJSON);

  const handleChange = (event: Event, newTabIndex: number): void => {
    setTabIndex(newTabIndex);
  };

  return (
    <DndProvider backend={Backend}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper>
            <Tabs
              value={tabIndex}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="disabled tabs example"
            >
              <Tab label="Creator" />
              <Tab label="Preview" disabled={formJson.length === 0} />
              <Tab label="JSON" />
            </Tabs>
            {tabIndex === 0 && (
              <Box style={style.listContainer}>
                <Creator formJson={formJson} setFormJson={setFormJson} />
              </Box>
            )}
            {tabIndex === 1 && (
              <Box style={style.listContainer}>
                <PreviewGenerator formJson={formJson} />
              </Box>
            )}
            {tabIndex === 2 && (
              <Box style={style.listContainer}>
                <List>
                  <ListItem>
                    <JSONPretty id="json-pretty" data={clearJsonOutput(formJson)} />
                  </ListItem>
                </List>
              </Box>
            )}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Tabs value={0} indicatorColor="primary" textColor="primary">
            <Tab label="Possible Fields" />
          </Tabs>
          <Paper>
            <FieldList />
          </Paper>
        </Grid>
      </Grid>
    </DndProvider>
  );
};

export default ReactFormCreator;
