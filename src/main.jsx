import React from 'react';
import ReactDOM from 'react-dom';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#adb31b',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
