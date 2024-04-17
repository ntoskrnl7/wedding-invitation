'use client';

import palette from './palette.module.scss'

import { createTheme, ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: palette['primary-color-main'],
      '50': '#eee7da',
      '100': '#cfc2b2',
      '200': '#ab9a86',
      '300': '#87745b',
      '400': '#6e583c',
      '500': '#543e1d',
      '600': '#4b3618',
      '700': '#3e2b11',
      '800': '#321f05',
      '900': '#261200',
      contrastText: '#7b6a58',
    },
    secondary: {
      
      main: '#294892',
      '50': '#e4f2fb',
      '100': '#bfdef7',
      '200': '#98caf2',
      '300': '#73b5ec',
      '400': '#5aa5e8',
      '500': '#4896e4',
      '600': '#4288d7',
      '700': '#3a77c4',
      '800': '#3466b2',
      '900': '#294892',
      contrastText: '#e4f2fb'
    },
    text: {
      primary: '#7b6a58',
      secondary: '#c9af97',
      disabled: '#312626',
    },
  },

  // palette: {
  //   primary: {
  //     main: '#cfc2b2',
  //     '50': '#eee7da',
  //     '100': '#cfc2b2',
  //     '200': '#ab9a86',
  //     '300': '#87745b',
  //     '400': '#6e583c',
  //     '500': '#543e1d',
  //     '600': '#4b3618',
  //     '700': '#3e2b11',
  //     '800': '#321f05',
  //     '900': '#261200',
  //     contrastText: '#7b6a58',
  //   },
  //   secondary: {
  //     main: '#294892',
  //     '50': '#e4f2fb',
  //     '100': '#bfdef7',
  //     '200': '#98caf2',
  //     '300': '#73b5ec',
  //     '400': '#5aa5e8',
  //     '500': '#4896e4',
  //     '600': '#4288d7',
  //     '700': '#3a77c4',
  //     '800': '#3466b2',
  //     '900': '#294892',
  //     contrastText: '#e4f2fb'
  //   },
  //   text: {
  //     primary: '#7b6a58',
  //     secondary: '#c9af97',
  //     disabled: '#312626',
  //   },
  // },
};

export default createTheme(themeOptions);