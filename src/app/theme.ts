'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    text: {
      primary: 'rgb(123, 106, 88)',
    },
    primary: {
      main: 'rgb(241, 237, 225)',
      '50': 'rgb(241, 237, 225)',
      '100': 'rgb(218, 208, 196)',
      '200': 'rgb(207, 194, 178)',
      '300': 'rgb(197, 184, 167)',
      '400': 'rgb(123, 106, 88)',
      contrastText: 'rgb(123, 106, 88)',
    },
    secondary: {
      main: 'rgb(41, 73, 146)',
    }
  },
});

export default theme;