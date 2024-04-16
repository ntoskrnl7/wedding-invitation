'use client';

import Book from './book';

import Backdrop from '@mui/material/Backdrop';

import { MenuState, useMenuState } from '../menu/state';

import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import { Box, Typography, duration } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { styled } from '@mui/system';

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

  const stopPointRef = useRef<HTMLElement>(null);

  useEffect(() => {

    function smoothScrollTo(options: Omit<ScrollToOptions, 'behavior'> & { duration: number }) {

      let handles: number[] = [];

      if (options.top) {
        const top = options.top;

        const targetPosition = options.top;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime: number | null = null;

        const animation = (currentTime: number) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const next = easeInOutQuad(timeElapsed, startPosition, distance, options.duration);
          window.scrollTo(0, next);
          if (timeElapsed < options.duration) handles.push(requestAnimationFrame(animation));
        };

        const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        }

        handles.push(requestAnimationFrame(animation));
      }
    }

    let lastScrollY = 0;

    const handleScroll = (ev: Event) => {
      const stopPoint = stopPointRef.current;
      if (stopPoint) {
        const stopPosition = stopPoint.getBoundingClientRect().top + window.scrollY;

        // 스크롤이 책 상단 아래로 내려가려고 한다면, 책 상단에 스크롤이 오도록 처리합니다.
        if (window.scrollY > stopPosition) {
          window.scrollTo({
            top: stopPosition,
            behavior: 'auto'
          });

          // 아직 안내 메시지가 보이면서 스크롤이 내려가는 상황이라면, 스크롤을 책 상단으로 내리도록합니다.
        } else if (window.scrollY > lastScrollY) {
          smoothScrollTo({
            top: stopPosition,
            duration: 50
          });
        }
        lastScrollY = window.scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        transitionDuration={{ exit: 1000 }}
        onClick={() => setOpen(false)}
      >
        <Typography margin={1} textAlign={'center'}>가로 화면으로 돌려서 보시는것을 권장합니다.</Typography>
      </Backdrop>

      <Box >
        <Box
          sx={{
            marginTop: '10vh',
            height: '100vh'
          }}
          style={{ display: 'grid', placeItems: 'center' }}
        >
          <Box>
            <Typography variant='h6' textAlign={'center'}>Our story</Typography>
            <br />
            <Typography textAlign={'center'}>앨범을 보시려면 화면을 내려주세요 😁</Typography>
          </Box>
          <Typography><HeartbeatsArrowIcon style={{ transform: 'rotate(90deg)' }} /></Typography>
        </Box>

        <Box ref={stopPointRef} />
      </Box>

      <Box style={{ display: 'grid', placeItems: 'center', height: '100vh', overflowX: 'hidden' }}>
        <Book />
      </Box>

      <Box style={{ height: '100vh' }} />
    </Box >
  );
}
