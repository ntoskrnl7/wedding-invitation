'use client';

import { useState, ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import MenuList from './list';

import { useMenuState } from './state';
import { MenuStateProvider } from './state';
import { Box } from '@mui/material';

export default function MenuBar() {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const { menuState, setMenuState } = useMenuState();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = (e: any) => {
    setDrawerOpen(false);
  };

  return (
    <div>
      <AppBar className='MenuBar' style={{ pointerEvents: 'none', backgroundColor: `rgba(255,255,255,${menuState.opacity})`, boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" style={{ color: 'black', textShadow: '1px 1px 20x black' }}>
            {menuState.title}
          </Typography>
          <Box flexGrow={1} />
          <IconButton
            style={{ pointerEvents: 'all' }}
            edge="end"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="top"
        open={isDrawerOpen}
        onClick={handleDrawerClose}
        onClose={handleDrawerClose}
      >
        <MenuList />
      </Drawer>
    </div>
  );
}