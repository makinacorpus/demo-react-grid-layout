import React from 'react';

import {
  Button,
  ButtonGroup,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  HighlightOff,
  ContentCopy,
  Edit,
} from '@mui/icons-material';

import pictures from './pictures.json';

const Wrapper = ({ edit, href, ...props }) => {
  if (edit) {
    return (
      <Box {...props} />
    );
  }

  return (
    <CardActionArea href={href} {...props} />
  );
};

const ConfigForm = ({
  edit,
  blockSetup: {
    i: key,
    data = {},
    data: {
      lien = '#',
      picture,
      titre,
      description,
    } = {},
  } = { data: {} },
  onDelete = () => null,
  onClone = () => null,
  onSave = () => null,
}) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [newData, setNewData] = React.useState(data);

  const handleEdit = () => {
    setDialogOpen(true);
  };

  const handlePictureChange = event => {
    setNewData(prevData => ({ ...prevData, picture: event.target.value }));
  };
  const handleLinkChange = event => {
    setNewData(prevData => ({ ...prevData, lien: event.target.value }));
  };

  const handleDialogClose = shouldSave => () => {
    if (shouldSave) {
      onSave(key, newData);
    }

    setNewData(data);
    setDialogOpen(false);
  };

  return (
    <Card
      sx={{
        flex: 1,
        backgroundImage: `url(${picture})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        display: 'flex',
      }}
      elevation={5}
    >
      <Wrapper edit={edit} href={lien}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {titre}
          </Typography>

          {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          )}

          {Boolean(edit) && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                bgcolor: 'white',
                opacity: 0.5,
                cursor: 'move',
              }}
            />
          )}

          {Boolean(edit) && (
            <ButtonGroup sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white' }}>
              <Button
                onClick={() => onDelete(key)}
                color="error"
              >
                <HighlightOff />
              </Button>

              <Button
                onClick={() => onClone(key)}
                color="success"
              >
                <ContentCopy />
              </Button>

              <Button
                onClick={handleEdit}
                color="info"
              >
                <Edit />
              </Button>
            </ButtonGroup>
          )}
        </CardContent>
      </Wrapper>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle>
          Contenu du bloc
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="picture-select-label">Image</InputLabel>
            <Select
              labelId="picture-select-label"
              id="picture-select"
              defaultValue={newData.picture}
              value={newData.picture}
              label="Image"
              onChange={handlePictureChange}
            >
              {pictures.map(({ filename = '', title = '' }) => (
                <MenuItem key={filename} value={filename}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      mr: 1,
                      backgroundImage: `url(${filename})`,
                      backgroundPosition: 'center center',
                      backgroundSize: 'cover',
                      display: 'inline-block',
                      verticalAlign: 'middle',
                    }}
                  />
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="outlined-basic"
            label="Adresse du lien"
            variant="outlined"
            value={newData.lien}
            onChange={handleLinkChange}
            sx={{ mt: 2 }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="outlined" onClick={handleDialogClose(false)}>
            Annuler
          </Button>

          <Button color="success" variant="contained" onClick={handleDialogClose(true)}>
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ConfigForm;
