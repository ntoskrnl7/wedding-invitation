'use client';

import { useState, useRef, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import MenuList from './list';

import { useMenuState } from './state';
import { Alert, AlertColor, Box, Snackbar } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos, MusicNote, MusicOff } from '@mui/icons-material';

import songs from '../songs';

export default function MenuBar() {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const { menuState, setMenuState } = useMenuState();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = (e: any) => {
    setDrawerOpen(false);
  };

  const [result, setResult] = useState<{ severity: AlertColor, message?: React.JSX.Element | undefined }>({ severity: 'success' });

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSongIndex, setCurrentSongIndex] = useState(menuState.song ? songs.indexOf(menuState.song) : 0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playPreviousSong = () => {
    setCurrentSongIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : songs.length - 1);
  };

  const playNextSong = () => {
    setCurrentSongIndex(prevIndex => (prevIndex + 1) % songs.length);
  };

  useEffect(() => {
    if (menuState.song) {
      setCurrentSongIndex(songs.indexOf(menuState.song));
    }
  }, [menuState.song]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(error => {
        console.error(error);
        setResult({ severity: 'error', message: <Typography>브라우저 정책으로 재생이 실패하였습니다.<br /><MusicNote />를 누르셔서 재생하시기 바랍니다.</Typography> });
        setOpen(true);
        setIsPlaying(false);
      })
    }
  }, [currentSongIndex]);

  const [open, setOpen] = useState(false);
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const touchStartX = useRef(0);

  const handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLButtonElement>) => {
    const touchEndX = event.changedTouches[0].clientX;
    if (touchEndX > touchStartX.current + 50) {
      playNextSong();
    } else if (touchStartX.current > touchEndX + 50) {
      playPreviousSong();
    }
  };

  return (
    <div>
      <AppBar className='MenuBar' style={{ pointerEvents: 'all', backgroundColor: `rgba(255,255,255,${menuState.opacity})`, boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant='h6' style={{ marginTop: 10, color: 'black', textShadow: '1px 1px 20x black' }}>
            {menuState.title}
          </Typography>
          <Box flexGrow={1} />

          <Snackbar style={{ opacity: 0.5 }} open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={result.severity}
              variant="filled"
              sx={{ width: '100%' }}
            >
              {result.message}
            </Alert>
          </Snackbar>

          <audio
            src={'/bgm/' + songs[currentSongIndex] + '.mp3'}
            ref={audioRef}
            onPlay={
              () => {
                setIsPlaying(true);
                setResult({ severity: 'info', message: <>{songs[currentSongIndex]}</> });
                setOpen(true);
              }
            }
            onEnded={
              () => {
                playNextSong();
                setIsPlaying(true);
              }
            }
            onPause={() => setIsPlaying(false)}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pointerEvents: 'all' }}>
            <IconButton style={{ padding: 0 }} onClick={playPreviousSong}>
              <ArrowBackIosNew style={{ fontSize: '8px' }} />
            </IconButton>

            <IconButton
              style={{ padding: 0 }}
              onClick={togglePlayPause}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {isPlaying ? <MusicOff /> : <MusicNote />}
            </IconButton>

            <IconButton style={{ padding: 0 }} onClick={playNextSong}>
              <ArrowForwardIos style={{ fontSize: '8px' }} />
            </IconButton>
          </Box>

          <IconButton
            style={{ marginLeft: 12, pointerEvents: 'all' }}
            edge='end'
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor='top'
        open={isDrawerOpen}
        onClick={handleDrawerClose}
        onClose={handleDrawerClose}
      >
        <MenuList />
      </Drawer>
    </div>
  );
}