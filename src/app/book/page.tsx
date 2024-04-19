'use client';

import { useEffect, useRef, useState } from 'react';

import { Box, Typography, Backdrop } from '@mui/material';
import { styled } from '@mui/system';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import Book from './book';
import { MenuState, useMenuState } from '../menu/state';

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
  const { setMenuState } = useMenuState();
  useEffect(() => {
    setMenuState(() => ({ ...ThisMenuState }));
  }, [setMenuState])

  const isPortrait = () => (typeof window === "undefined") || window.screen.orientation.type === 'portrait-primary';

  // 가로 화면 권장 안내 화면 관련 기능.
  const [open, setOpen] = useState(isPortrait());

  // 3초 뒤에 안내 화면을 닫도록합니다.
  useEffect(() => {
    setTimeout(() => setOpen(false), 3000);
  }, [setOpen])

  // 화면이 회전되거나 사이즈 조정될 때, 수행해야할 것들을 처리합니다.
  useEffect(() => {
    const onOrientationChange = () => {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });

      // 세로 화면일때는 80% 불투명도로 보이게 하고, 가로 화면일때는 메뉴 바가 보이지 않도록 처리합니다.
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

  const stopPointRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function smoothScrollTo(options: Omit<ScrollToOptions, 'behavior'> & { duration: number }) {
      const startPositionY = window.scrollY;
      const startPositionX = window.scrollX;
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;

        if (options.top !== undefined) {
          const distanceY = options.top - startPositionY;
          const nextY = easeInOutQuad(timeElapsed, startPositionY, distanceY, options.duration);
          window.scrollTo({ top: nextY, behavior: 'auto' });
        }

        if (options.left !== undefined) {
          const distanceX = options.left - startPositionX;
          const nextX = easeInOutQuad(timeElapsed, startPositionX, distanceX, options.duration);
          window.scrollTo({ left: nextX, behavior: 'auto' });
        }
        if (timeElapsed < options.duration) requestAnimationFrame(animation);
      }

      const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
    }

    let lastScrollY = 0;

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

          /**
           * 아직 안내 메시지가 보이면서(스크롤이 책 상단 위에 있는 경우) 스크롤이 내려가는 상황이라면,
           * 스크롤을 책 상단으로 내리도록 합니다.
           */
        } else if (/* window.scrollY < stopPosition && */ window.scrollY > lastScrollY) {
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
    <>
      <Backdrop
        sx={{
          '@media (orientation: landscape)': { display: 'none !important' },
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
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
            <Typography className='typewriter' textAlign={'center'}>앨범을 보시려면 화면을 내려주세요 😁</Typography>
          </Box>
          <Typography sx={{ marginBottom: '10vh' }}><HeartbeatsArrowIcon style={{ transform: 'rotate(90deg)' }} /></Typography>
        </Box>

      </Box>

      <Box style={{ display: 'grid', placeItems: 'center', height: '100vh', overflowX: 'hidden' }}>
        <Box ref={stopPointRef} />
        <Book />
      </Box>

      <Box style={{ height: '100vh' }} />
    </ >
  );
}
