'use client';

import Book from './book';

import { useMenuState } from '../menu/state';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { Typography } from '@mui/material';

const ThisMenuState = {
  title:
    <Typography
      variant='h6'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <PhotoLibraryIcon sx={{ marginRight: 1 }} />
      앨범
    </Typography>,
  opacity: 0
};

export default function Page() {
  const { menuState, setMenuState } = useMenuState();
  if (ThisMenuState !== menuState) {
    setMenuState(() => ThisMenuState);
  }
  return (
    <main style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <Book />
    </main >
  );
}
