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
import { getFromLS, saveToLS } from './local-storage';

const GridLayout = WidthProvider(ReactGridLayout);

const App = () => {
  const [editMode, setEditMode] = React.useState(false);

  const [setup, setSetup] = useState(getFromLS('setup') || defaultSetup);

  const blockSx = {
    background: '#fafafa',
    display: 'flex',
  };

  const handleLayoutChange = layout => {
    saveToLS('setup', setup);
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

  const updateBlock = (blockId, newData) => {
    setSetup(prevSetup => {
      const newSetup = JSON.parse(JSON.stringify(prevSetup));
      newSetup.blocks[blockId] = {
        ...prevSetup.blocks[blockId],
        data: {
          ...prevSetup.blocks[blockId].data,
          ...newData,
        },
      };
      return newSetup;
    });
  };

  const removeBlock = key => setSetup(prevSetup => {
    const newSetup = JSON.parse(JSON.stringify(prevSetup));
    delete newSetup.blocks[key];
    return newSetup;
  });

  const layout = Object.values(setup.blocks).map(a => ({ ...a, static: !editMode }));

  return (
    <Container sx={{ py: 2 }}>
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
        layout={layout}
        cols={3}
        rowHeight={100}
        onLayoutChange={handleLayoutChange}
        draggableCancel=".MuiButtonGroup-root"
      >
        {layout.map(blockSetup => (
          <Box key={blockSetup.i} sx={blockSx}>
            <ConfigForm
              blockSetup={blockSetup}
              edit={editMode}
              onDelete={removeBlock}
              onClone={addBlock}
              onSave={updateBlock}
            />
          </Box>
        ))}
      </GridLayout>
    </Container>
  );
};

export default App;
