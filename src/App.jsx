/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import {
  Add as AddIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  Restore as RestoreIcon,
} from '@mui/icons-material';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import ConfigForm from './ConfigForm';
import defaultSetup from './default-setup';

const GridLayout = WidthProvider(ReactGridLayout);

const App = () => {
  const [editMode, setEditMode] = React.useState(false);

  const [setup, setSetup] = useState(defaultSetup);

  const blockSx = {
    background: '#fafafa',
    display: 'flex',
  };

  const handleLayoutChange = layout => {
    setSetup(prevSetup => ({
      ...prevSetup,
      blocks: layout.reduce((acc, curr) => ({
        ...acc,
        [curr.i]: {
          ...prevSetup.blocks[curr.i],
          ...curr,
        },
      }), {}),
    }));
  };

  const addBlock = templateID => setSetup(prevSetup => {
    const newKey = `bloc-${Date.now()}`;
    const template = prevSetup.blocks[templateID];
    const newBlock = template
      ? { ...template, i: newKey }
      : { i: newKey, w: 1, h: 1, x: 0, y: -1 };

    return {
      ...prevSetup,
      blocks: {
        ...prevSetup.blocks,
        [newKey]: newBlock,
      },
    };
  });

  const removeBlock = key => setSetup(prevSetup => {
    const newSetup = JSON.parse(JSON.stringify(prevSetup));
    delete newSetup.blocks[key];
    return newSetup;
  });

  return (
    <Container sx={{ border: '1px dotted orange', py: 2 }}>
      <Box sx={{ px: 1, display: 'flex', justifyContent: 'flex-end' }}>
        {Boolean(editMode) && (
          <>
            <Button
              onClick={() => setSetup(defaultSetup)}
              variant="outlined"
              endIcon={<RestoreIcon />}
              color="error"
              sx={{ textTransform: 'none', mx: 0.5, marginRight: 'auto' }}
            >
              Réinitialiser
            </Button>
            <Button
              onClick={addBlock}
              variant="outlined"
              endIcon={<AddIcon />}
              color="success"
              sx={{ textTransform: 'none', mx: 0.5 }}
            >
              Ajouter un bloc
            </Button>
          </>
        )}
        <Button
          onClick={() => setEditMode(prev => !prev)}
          variant={editMode ? 'contained' : 'outlined'}
          color={editMode ? 'info' : 'primary'}
          endIcon={editMode ? <DoneIcon /> : <EditIcon />}
          sx={{ textTransform: 'none', mx: 0.5 }}
        >
          {!editMode ? 'Éditer' : 'Terminer'}
        </Button>
      </Box>

      <GridLayout
        className="layout"
        layout={Object.values(setup.blocks).map(a => ({ ...a, static: !editMode }))}
        cols={3}
        rowHeight={100}
        onLayoutChange={handleLayoutChange}
      >
        {Object.values(setup.blocks).map(blockSetup => (
          <Box key={blockSetup.i} sx={blockSx}>
            <ConfigForm
              blockSetup={blockSetup}
              edit={editMode}
              onDelete={removeBlock}
              onClone={addBlock}
            />
          </Box>
        ))}
      </GridLayout>
    </Container>
  );
};

export default App;
