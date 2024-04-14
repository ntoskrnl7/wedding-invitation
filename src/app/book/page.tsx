'use client';

import Book from './book';

import Backdrop from '@mui/material/Backdrop';

import { MenuState, useMenuState } from '../menu/state';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const ThisMenuState: MenuState = {
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
  opacity: 0.8
};

export default function Page() {
  const { menuState, setMenuState } = useMenuState();
  useEffect(() => {
    setMenuState(() => ThisMenuState);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }, []);

  const [open, setOpen] = useState((typeof window === "undefined") || window.screen.orientation.type === 'portrait-primary');

  return (
    <Box
      style={{ display: 'grid', placeItems: 'center' }}
      sx={{
        '@media (orientation: portrait)': { height: '100vh' }
      }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        transitionDuration={{ exit: 1000 }}
        onClick={() => setOpen(false)}
      >
        <Typography margin={1} textAlign={'center'}>가로 화면으로 돌려서 보시는것을 권장합니다.</Typography>
      </Backdrop>
      <Book />
    </Box >
  );
}
