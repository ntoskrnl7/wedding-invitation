'use client';

import Book from './book';

import Backdrop from '@mui/material/Backdrop';

import { useMenuState } from '../menu/state';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

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
  useEffect(() => {
    if (ThisMenuState !== menuState) {
      setMenuState(() => ThisMenuState);
    }

    setTimeout(() => {
      setOpen(false);
    }, 3000);
  });

  const [open, setOpen] = useState(true);

  return (
    <main style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setOpen(!open)}
      >
        <Typography>가로 화면으로 돌려서 보시는것을 권장합니다.</Typography>
      </Backdrop>
      <Book />
    </main >
  );
}
