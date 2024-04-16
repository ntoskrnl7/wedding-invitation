'use client';

import Book from './book';

import Backdrop from '@mui/material/Backdrop';

import { MenuState, useMenuState } from '../menu/state';

import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

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
  opacity: 0
};

export default function Page() {
  const { menuState, setMenuState } = useMenuState();
  useEffect(() => {
    setMenuState(() => ThisMenuState);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }, [setMenuState])

  // 가로 화면일때는 메뉴바가 보이지 않도록 처리합니다.
  useEffect(() => {
    const onOrientationChange = () => {
      setMenuState(prevState => ({
        ...prevState,
        opacity: window.screen.orientation.type === 'portrait-primary' ? 0.8 : 0
      }));
    };

    window.addEventListener('resize', onOrientationChange);
    window.addEventListener('orientationchange', onOrientationChange);
    onOrientationChange();

    return () => {
      window.removeEventListener('resize', onOrientationChange)
      window.removeEventListener('orientationchange', onOrientationChange)
    };
  }, [setMenuState]);

  const [open, setOpen] = useState((typeof window === "undefined") || window.screen.orientation.type === 'portrait-primary');

  const handleScroll = () => {
    const stopPoint = stopPointRef.current;
    if (stopPoint) {
      const stopPosition = stopPoint.getBoundingClientRect().top + window.scrollY;

      // 스크롤이 책 상단 아래로 내려가려고 한다면, 책 상단에 스크롤이 오도록 처리합니다.
      if (window.scrollY > stopPosition) {
        window.scrollTo({
          top: stopPosition,
          behavior: 'auto'
        });
      }
    }
  };

  const stopPointRef = useRef<HTMLElement>(null);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

      <Box
        sx={{
          '@media (orientation: portrait)': { display: 'none !important' },
          height: '50vh'
        }}
        style={{ display: 'grid', placeItems: 'center' }}
      >
        화면을 당겨보세요
        <Typography><DoubleArrowIcon style={{ transform: 'rotate(90deg)' }} />
        </Typography>
      </Box>

      <Box
        sx={{
          '@media (orientation: portrait)': { display: 'none !important' },
        }}
        ref={stopPointRef} />

      <Book />

      <Box
        sx={{
          '@media (orientation: portrait)': { display: 'none !important' },
          height: '100vh'
        }}
      />
    </Box >
  );
}
