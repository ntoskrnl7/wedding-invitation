'use client'

import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useMenuState } from '../menu/state';
import { Typography } from '@mui/material';
import { useEffect } from 'react';

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
      <HowToRegIcon sx={{ marginRight: 1 }} />
      참석 여부
    </Typography>,
  opacity: 0.8
};

export default function Page() {
  const { menuState, setMenuState } = useMenuState();
  useEffect(() => {
    if (ThisMenuState !== menuState) {
      setMenuState(() => ThisMenuState);
    }
  })
  return (
    <iframe style={{ marginTop: 60, border: 0, height: '100vh', width: '100vw' }} src='https://joey.team/block/?id=2WKGeXeWJ6XfZ7XijM2azA5FZrj2&block_id=UdfwEPBuwGt3GbXhWmFt' />
  );
}