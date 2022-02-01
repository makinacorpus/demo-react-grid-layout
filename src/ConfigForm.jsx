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
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import {
  HighlightOff,
  ContentCopy,
  Edit,
} from '@mui/icons-material';

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
    data: {
      lien = '#',
      picture,
      titre,
      description,
    } = {},
  } = { data: {} },
  onDelete = () => null,
  onClone = () => null,
}) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleEdit = () => {
    setDialogOpen(true);
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
    >
      <Wrapper edit={edit} href={lien} target="_blank">
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
          <DialogContentText>
            contenu
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="outlined" onClick={() => setDialogOpen(false)}>
            Annuler
          </Button>

          <Button color="success" variant="contained" onClick={() => setDialogOpen(false)}>
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ConfigForm;
