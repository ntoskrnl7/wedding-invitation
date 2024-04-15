'use client';

import { Box, Typography } from '@mui/material';
import { useMenuState } from '../menu/state';
import CommentIcon from '@mui/icons-material/Comment';
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
      <CommentIcon sx={{ marginRight: 1 }} />
      방명록
    </Typography>,
  opacity: 0.8
};

export default function Page() {
  const { menuState, setMenuState } = useMenuState();
  useEffect(() => {
    setMenuState(() => ThisMenuState);
  }, [setMenuState]);
  return (
    <Box>
      <div style={{ position: 'fixed', top: 0, backgroundColor: 'white', height: 60, width: '100vw' }}></div>
      <iframe style={{ marginTop: 10, zIndex: 2000, border: 0, height: '100vh', width: '100vw' }} src='https://joey.team/block?block_id=ZKSCq2LqiYzSCpDiA5NM&id=2WKGeXeWJ6XfZ7XijM2azA5FZrj2' />
    </Box>
  );
}