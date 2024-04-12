'use client';

import { Typography } from '@mui/material';
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
  opacity: 1
};

export default function Page() {
  const { menuState, setMenuState } = useMenuState();
  useEffect(() => {
    if (ThisMenuState !== menuState) {
      setMenuState(() => ThisMenuState);
    }
  });
  return (
    <>
      <iframe style={{ border: 0, height: '100vh', width: '100vw' }} src='https://joey.team/block?block_id=ZKSCq2LqiYzSCpDiA5NM&id=2WKGeXeWJ6XfZ7XijM2azA5FZrj2' />
    </>
  );
}