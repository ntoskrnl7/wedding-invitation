'use client';

import palette from './palette.module.scss'

import { createTheme, ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: palette['primary-color-main'],
      '50': palette['primary-color-50'],
      '100': palette['primary-color-100'],
      '200': palette['primary-color-200'],
      '300': palette['primary-color-300'],
      '400': palette['primary-color-400'],
      '500': palette['primary-color-500'],
      '600': palette['primary-color-600'],
      '700': palette['primary-color-700'],
      '800': palette['primary-color-800'],
      '900': palette['primary-color-900'],
      contrastText: palette['primary-color-contrast-text']
    },
    secondary: {
      main: palette['secondary-color-main'],
      '50': palette['secondary-color-50'],
      '100': palette['secondary-color-100'],
      '200': palette['secondary-color-200'],
      '300': palette['secondary-color-300'],
      '400': palette['secondary-color-400'],
      '500': palette['secondary-color-500'],
      '600': palette['secondary-color-600'],
      '700': palette['secondary-color-700'],
      '800': palette['secondary-color-800'],
      '900': palette['secondary-color-900'],
      contrastText: palette['secondary-color-contrast-text']
    },
    text: {
      primary: palette['text-color-primary'],
      secondary: palette['text-color-secondary'],
      disabled: palette['text-color-disabled'],
    },
  },
};

export default createTheme(themeOptions);