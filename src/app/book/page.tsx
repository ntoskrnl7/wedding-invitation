'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';

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

  const isPortrait = () => (typeof window === "undefined") || window.screen.orientation.type === 'portrait-primary';

  // 가로 화면 권장 안내 화면 관련 기능.
  const [open, setOpen] = useState(isPortrait());

  // 3초 뒤에 안내 화면을 닫도록합니다.
  useEffect(() => {
    setTimeout(() => setOpen(false), 3000);
  }, [])

  // 스크롤이 책 상단 아래로 내려가려고 한다면, 책 상단에 스크롤이 오도록 처리합니다.
  const stopPointRef = useRef<HTMLElement>(null);
  useEffect(() => {

    const handleScroll = () => {
      const stopPoint = stopPointRef.current;
      if (stopPoint) {
        const stopPosition = stopPoint.getBoundingClientRect().top + window.document.body.scrollTop;
        if (window.document.body.scrollTop > stopPosition) {
          window.document.body.scrollTo({ top: stopPosition, behavior: 'instant' });
        }
      }
    };
    window.document.body.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.document.body.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 화면이 회전되거나 사이즈 조정될 때, 수행해야할 것들을 처리합니다.
  const [opacity, setOpacity] = useState(isPortrait() ? 0.8 : 0);
  useEffect(() => {
    const onOrientationChange = () => {

      // 첫 화면이 보이도록 합니다.
      window.document.body.scrollTo({ top: 0, behavior: 'instant' });

      // 세로 화면일때는 80% 불투명도로 보이게 하고, 가로 화면일때는 메뉴 바가 보이지 않도록 처리합니다.
      setOpacity(isPortrait() ? 0.8 : 0);
    };

    window.addEventListener('resize', onOrientationChange);
    window.addEventListener('orientationchange', onOrientationChange);
    onOrientationChange();

    return () => {
      window.removeEventListener('resize', onOrientationChange)
      window.removeEventListener('orientationchange', onOrientationChange)
    };
  }, []);

  return (
    <Box style={{ height: '100vh' }}>
      <Menu
        opacity={opacity}
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
        <Typography margin={1} textAlign={'center'}>가로 화면으로 돌려서 보시는것을 권장합니다.</Typography>
      </Backdrop>
      <Box className='no-bounce'>
        <section style={{ marginTop: '10vh', display: 'grid', placeItems: 'center' }}>
          <Box className='no-bounce'>
            <Typography variant='h6' textAlign={'center'}>Our story</Typography>
            <br />
            <Typography className='typewriter' textAlign={'center'}>앨범을 보시려면 화면을 내려주세요 😁</Typography>
          </Box>
          <Typography className='no-bounce' sx={{ marginBottom: '10vh' }}>
            <HeartbeatsArrowIcon style={{ transform: 'rotate(90deg)' }} />
          </Typography>
        </section>

        <Box ref={stopPointRef} />

        <section style={{ display: 'grid', placeItems: 'center', height: '100vh', overflowX: 'hidden' }} >
          <Book className='no-bounce' />
        </section>

        <section />
      </Box>
    </Box >
  );
}
