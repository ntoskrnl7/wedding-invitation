'use client';

import { Menu } from './menu';

import Image from 'next/image';

import { CSSProperties, useEffect, useState } from 'react';

import ConstructionIcon from '@mui/icons-material/Construction';
import { Box, Typography } from '@mui/material';

export default function Page() {
  const styles: {
    container: CSSProperties,
    section: CSSProperties
  } = {
    container: {
      height: '100%',
      overflowY: 'scroll' as const,
      scrollSnapType: 'y mandatory' as const,
      scrollBehavior: 'smooth' as const
    },
    section: {
      height: '100%',
      scrollSnapAlign: 'start' as const,
    }
  };

  const isPortrait = () => (typeof window === "undefined") || window.screen.orientation.type === 'portrait-primary';

  const [unit, setUnit] = useState(isPortrait() ? 'vh' : 'vw');
  useEffect(() => {
    const onOrientationChange = () => {
      setUnit(isPortrait() ? 'vh' : 'vw');
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
    <Box style={{ height: '100%' }}>
      <Menu title={<></>} opacity={0} />
      <Box style={{ height: '100vh' }}>

        <Box style={{ ...styles.container, backgroundColor: 'var(--primary-color-50)', }}>

          <Box style={{ ...styles.section }}>
            <Box style={{ height: '100%', display: 'grid', alignItems: 'center', justifyItems: 'center' }}>
              <ConstructionIcon color='warning' style={{ fontSize: '100px' }} />
              <Typography variant="body1" style={{ textAlign: 'center' }}>현재 페이지는 준비 중입니다.😭<br />24년 4월 22일에 완료 예정입니다.😁</Typography>
            </Box>
          </Box>

          <Box style={{ ...styles.section }}>

            <Image style={{ zIndex: 2, position: 'relative', top: '0vh', left: '48vw', width: '30' + unit, height: '30' + unit }} src={'/img/hand-top.svg'} width='0' height='0' alt='/' />

            <Box style={{ height: '100%' }}>

              <Box style={{ position: 'relative', top: '-20vh', color: 'black', textAlign: 'center' }}>
                <Typography fontSize={'1.7' + unit} fontFamily={'Kayonest Free Trial'}>WEDDING DAY</Typography>
                <Image style={{ width: '1.5' + unit, height: '1.8' + unit }} src={'/img/bar.svg'} width='12' height='12' alt='/' />
                <Typography fontSize={'2' + unit} fontFamily={'Garamond'}>JUNG KWANG & HA EUN</Typography>
              </Box>

              <Image style={{ zIndex: 1, position: 'relative', top: '-17vh', left: '25vw', width: '36' + unit, height: '50' + unit }} src={'/img/main.svg'} width='682' height='1084' alt='/' />

              <Image style={{ zIndex: 2, position: 'relative', top: '-40vh', left: '-10vw', width: '30' + unit, height: '30' + unit }} src={'/img/hand-bottom.svg'} width='0' height='0' alt='/' />

              <Box style={{ position: 'relative', top: '-45vh', color: 'black', textAlign: 'center' }}>
                <Typography fontSize={'1.7' + unit} fontFamily={'Kayonest Free Trial'}>2024. 05. 12</Typography>
                <Typography fontSize={'2' + unit} fontFamily={'Garamond'}>명동 밀리오레 호텔</Typography>
                <Typography fontSize={'2' + unit} fontFamily={'Garamond'}>18층 온즈드롬</Typography>
              </Box>

            </Box>
          </Box>
        </Box>
      </Box >
    </Box>
  );
}