'use client';

import { alpha } from '@mui/material/styles';

import { useState, useRef, useEffect } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Drawer } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

import MenuList from './list';

import { useMenuState } from './state';

import MusicPlayer from './music-player';

import theme from '../theme';
import { AlertMessage, showAlert } from '../alert-message';

export default function MenuBar() {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const { menuState, setMenuState } = useMenuState();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  // 메뉴바 크기를 CSS에서 얻을수있도록 --menu-bar-height를 등록 및 갱신합니다.
  const menuBarRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const onOrientationChange = () => {
      const menuBar = menuBarRef.current;
      if (menuBar) {
        console.log(menuBar.clientHeight + 'px');
        document.documentElement.style.setProperty('--menu-bar-height', menuBar.clientHeight + 'px');
      }
    };
    window.addEventListener('resize', onOrientationChange);
    window.addEventListener('orientationchange', onOrientationChange);

    onOrientationChange();

    return () => {
      window.removeEventListener('resize', onOrientationChange)
      window.removeEventListener('orientationchange', onOrientationChange)
      document.documentElement.style.removeProperty('--menu-bar-height');
    };
  }, []);

  return (
    <>
      <AlertMessage />

      <AppBar ref={menuBarRef} className='MenuBar' style={{ pointerEvents: 'none', backgroundColor: alpha(theme.palette.primary.main, menuState.opacity), boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant='h6' style={{ textShadow: '1px 1px 20x black' }}>
            {menuState.title}
          </Typography>

          <Box flexGrow={1} />

          <Box sx={{ pointerEvents: 'all' }}>
            <MusicPlayer
              onLoadStart={(music) => {
                showAlert({ severity: 'info', message: <>{music}</> });
              }}
              onPlay={(music) => {
                showAlert({ severity: 'success', message: <>{music} 재생 중</> });
              }}
              onPaused={(music) => {
                showAlert({ severity: 'info', message: <Typography variant='body2'><MusicNoteIcon />를 눌러서 {music}을 재생할 수 있습니다.</Typography> });
              }}
              onError={() => {
                showAlert({ severity: 'info', message: <Typography variant='body2'><MusicNoteIcon />를 눌러서 재생하시기 바랍니다.</Typography> });
              }}
            />
            <IconButton
              style={{ marginLeft: 12, pointerEvents: 'all' }}
              edge='end'
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor='top'
        open={isDrawerOpen}
        onClick={handleDrawerClose}
        onClose={handleDrawerClose}
        PaperProps={{
          style: {
            backgroundColor: 'transparent'
          }
        }}
      >
        <MenuList />
      </Drawer >
    </ >
  );
}