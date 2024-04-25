import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import { List, ListItemText, ListItemButton, IconButton, AppBar, Toolbar, Box } from '@mui/material';
import { Home, ArrowBack, Comment, HowToReg, Menu, MyLocation, Payment, PhotoLibrary } from '@mui/icons-material';

import './menu.scss';

export default function MenuPage() {
  const router = useRouter();

  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onOrientationChange = () => {
      const list = listRef.current;
      if (list) {
        if (list.clientHeight <= window.innerHeight) {
          list.style.height = window.innerHeight + 'px';
          const newHeight = list.clientHeight;
        }
      }
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
    <Box style={{ display: 'grid', alignItems: 'center', justifyItems: 'center', color: 'white', textShadow: '1px 1px 2px rgba(40,40,40, 0.5)', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <List style={{ overflowX: 'hidden' }} ref={listRef} className="box">
        <AppBar style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="back" onClick={() => {
              router.back();
            }}>
              <ArrowBack sx={{ color: 'white' }} />
            </IconButton>
            <Box flexGrow={1} />
            <IconButton edge="end" color="inherit" aria-label="menu">
              <Menu sx={{ color: 'white' }} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <ListItemButton style={{ width: '100%' }}>
          <ListItemText
            style={{ textAlign: 'center' }}
            onClick={() => {
              if (typeof window !== "undefined" && window.localStorage.getItem('mode') === 'home') {
                router.push('/home#first');
                return;
              }
              router.push('/#first');
            }}
          >
            <Home />
            <Typography variant="h6">- HOME -</Typography>
            <Typography variant="subtitle2">처음</Typography>
          </ListItemText>
        </ListItemButton>

        <ListItemButton style={{ width: '100%' }}>
          <ListItemText
            style={{ textAlign: 'center' }}
            onClick={() => {
              router.push('/book');
            }}
          >
            <PhotoLibrary />
            <Typography variant="h5">- OUR STORY -</Typography>
            <Typography variant="subtitle2">앨범</Typography>
          </ListItemText>
        </ListItemButton>

        <ListItemButton style={{ width: '100%' }}>
          <ListItemText
            style={{ textAlign: 'center' }}
            onClick={() => {
              router.push('/location');
            }}
          >
            <MyLocation />
            <Typography variant="h6">- LOCATION -</Typography>
            <Typography variant="subtitle2">오시는길</Typography>
          </ListItemText>
        </ListItemButton>

        <ListItemButton style={{ width: '100%' }}>
          <ListItemText
            style={{ textAlign: 'center' }}
            onClick={() => {
              if (typeof window !== "undefined" && window.localStorage.getItem('mode') === 'home') {
                router.push('/account-home');
                return;
              }
              router.push('/account');
            }}
          >
            <Payment />
            <Typography variant="h5">- ACCOUNT -</Typography>
            <Typography variant="subtitle2">마음 전하기</Typography>
          </ListItemText>
        </ListItemButton>

        <ListItemButton style={{ width: '100%' }}>
          <ListItemText
            style={{ textAlign: 'center' }}
            onClick={() => {
              router.push('/rsvp');
            }}
          >
            <HowToReg />
            <Typography variant="h5">- RSVP -</Typography>
            <Typography variant="subtitle2">참석 여부</Typography>
          </ListItemText>
        </ListItemButton>

        <ListItemButton style={{ width: '100%' }}>
          <ListItemText
            style={{ textAlign: 'center' }}
            onClick={() => {
              router.push('/guest');
            }}
          >
            <Comment />
            <Typography variant="h5">- GUEST BOOK -</Typography>
            <Typography variant="subtitle2">방명록</Typography>
          </ListItemText>
        </ListItemButton>
      </List>
    </Box >
  );
}