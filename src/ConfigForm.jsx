// import React from 'react';

import {
  Button,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';

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
}) => (
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
          <>
            <Button onClick={event => { onDelete(key); event.stopPropagation(); }}>delete</Button>
            <Button onClick={event => { onClone(key); event.stopPropagation(); }}>clone</Button>
          </>
        )}
      </CardContent>
    </Wrapper>
  </Card>
);

export default ConfigForm;
