'use client';

import { useEffect, useState } from 'react';

import { Box, Typography, Backdrop } from '@mui/material';
import { styled } from '@mui/system';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import Book from './book';
import { Menu } from '../menu';

const HeartbeatsArrowIcon = styled(DoubleArrowIcon)({
  transform: 'rotate(90deg)',
  animation: 'heartbeat 1.5s infinite',
  '@keyframes heartbeat': {
    '0%': {
      transform: 'rotate(90deg) scale(1)',
      opacity: 0.5
    },
    '14%': {
      transform: 'rotate(90deg) scale(1.3)',
      opacity: 1
    },
    '28%': {
      transform: 'rotate(90deg) scale(1)',
      opacity: 0.5
    },
    '42%': {
      transform: 'rotate(90deg) scale(1.3)',
      opacity: 1
    },
    '70%': {
      transform: 'rotate(90deg) scale(1)',
      opacity: 0.5
    },
    '100%': {
      transform: 'rotate(90deg) scale(1)',
      opacity: 0.5
    }
  }
});

export default function Page() {

  // 가로 화면 권장 안내 화면 관련 기능.
  const [open, setOpen] = useState((typeof window === "undefined") || window.screen.orientation.type.startsWith('portrait'));

  // 3초 뒤에 안내 화면을 닫도록합니다.
  useEffect(() => {
    setTimeout(() => setOpen(false), 3000);
  }, [])

  return (
    <Box style={{ height: '100vh' }}>
      <Menu
        opacity={0}
        title={<Typography
          variant='h6'
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <PhotoLibraryIcon sx={{ marginRight: 1 }} />
          앨범
        </Typography>
        }
      />
      <Backdrop
        sx={{
          '@media (orientation: landscape)': { display: 'none !important' },
          color: 'var(--primary-color-50)',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={open}
        transitionDuration={{ exit: 1000 }}
        onClick={() => setOpen(false)}
      >
        <Typography className='noto-serif-kr-regular' margin={1} textAlign={'center'}>가로 화면으로 돌려서 보시는것을 권장합니다.</Typography>
      </Backdrop>
      <Box className='no-bounce'>

        <section style={{ scrollSnapAlign: 'none', marginTop: '10vh', display: 'grid', placeItems: 'center', alignItems: 'center' }}>
          <Box className='no-bounce'>
            <Typography variant='h6' className='typewriter noto-serif-kr-regular' textAlign={'center'}>앨범을 보시려면 화면을 내려주세요 😁</Typography>
            <br />
            <Typography variant='body1' className='noto-serif-kr-regular' textAlign={'center'}>사진을 터치하시면 다음 사진으로 넘어갑니다.</Typography>
          </Box>
          <Typography style={{ marginTop: '10vh' }} className='no-bounce' sx={{ marginBottom: '10vh' }}>
            <HeartbeatsArrowIcon style={{ transform: 'rotate(90deg)' }} />
          </Typography>
        </section>

        <section id='book' style={{ scrollSnapAlign: 'none', display: 'grid', placeItems: 'center', height: '100vh', overflowX: 'hidden' }} >
          <Book />
        </section>

        <section style={{ height: 1, scrollSnapAlign: 'none' }} />
      </Box>
    </Box >
  );
}
