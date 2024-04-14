'use client';

import { useState, useEffect } from 'react';
import { Button, Box, Slider, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PlaceIcon from '@mui/icons-material/Place';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import Image from 'next/image';

import IconButton from '@mui/material/IconButton';

import { useMenuState } from '../menu/state';
import theme from '../theme';

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
      <MyLocationIcon sx={{ marginRight: 1 }} />
      오시는길
    </Typography>,
  opacity: 0.8
};

export default function Page() {
  const { menuState, setMenuState } = useMenuState();
  useEffect(() => {
    setMenuState(() => ThisMenuState);
    setTimeout(() => {
      setIsExpanded(false);
    }, 1000);
  }, []);

  const lat = 37.5610621;
  const lng = 126.9845390;
  const destName = '온즈드롬';

  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [zoom, setZoom] = useState(16);

  const handleZoomChange = (event: any, newValue: any) => {
    setZoom(newValue);
    if (map) {
      map.setZoom(newValue);
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNaverMapOpen = () => {
    if (typeof window !== "undefined") {
      window.open('https://naver.me/FwnAQmOf', '_blank');
    }
  };

  const handleKakaoMapOpen = () => {
    if (typeof window !== "undefined") {
      window.open('https://kko.to/Mk-bvDBBNQ', '_blank');
    }
  };

  const handleGoogleMapsAppOpen = () => {
    if (typeof window !== "undefined") {
      window.open('https://maps.app.goo.gl/oTUyZD7qLM4F4cby6', '_blank');
    }
  };

  const handleTMapAppOpen = () => {
    if (typeof window !== "undefined") {
      window.open(`tmap://route?goalx=${lat}&goaly=${lng}&goalname=${destName}`, '_blank');
    }
  };

  const AppleMapsButton = () => {
    if ((typeof window === "undefined") || ! /Mac|iPod|iPhone|iPad/.test(window.navigator.userAgent)) {
      return null;
    }
    return (
      <IconButton onClick={
        () => {
          if (typeof window !== "undefined") {
            window.open('https://maps.apple.com/?address=%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%A4%91%EA%B5%AC%20%EC%B6%A9%EB%AC%B4%EB%A1%9C1%EA%B0%80%2024-1,%2004536&auid=14074372663880552616&ll=37.561047,126.984427&lsp=9902&q=%EC%98%A8%EC%A6%88%EB%93%9C%EB%A1%AC&t=m', '_blank');
          }
        }}
      >
        <Image src={'/location/apple.png'} width='24' height='24' alt='apple' />
      </IconButton>
    );
  };

  const showDestinationInfo = (map: naver.maps.Map) => {
    const infowindow = new naver.maps.InfoWindow({ content: '<div style="padding:20px; text-align:center;">' + '여기로 오세요😊<br />👰🏻🧡🤵🏻' + '</div>' });
    infowindow.open(map, new naver.maps.LatLng(lat, lng));
  }

  const moveToDestination = () => {
    if (!map) return;
    map.setCenter(new window.naver.maps.LatLng(lat, lng));
    showDestinationInfo(map);
  };

  const moveToCurrentLocation = () => {
    if (map && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(location);
        const infowindow = new naver.maps.InfoWindow({ content: '<div style="padding:20px;">' + '지금은 여기 계시네요? 😁' + '</div>' });
        infowindow.open(map, location);
      }, (error) => {
        const center = map.getCenter();
        const infowindow = new naver.maps.InfoWindow({ content: '<div style="padding:20px;">' + '<h5 style="margin-bottom:5px;color:#f00;">위치 정보 획득 실패</h5>' + "x: " + center.x + "<br />y: " + center.y + '</div>' });
        infowindow.open(map, center);
        console.error("Error Code = " + error.code + " - " + error.message);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=jg0pwdf3vo';
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      const map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(lat, lng),
        zoom: 16,
      });
      map.addListener('zoom_changed', (zoom) => {
        setZoom(zoom);
      });
      setMap(map);
      showDestinationInfo(map);
    };
    return () => { document.head.removeChild(script) };
  }, []);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
      }}
    >
      <Box id="map" style={{ width: '100%', height: '100%' }}></Box>
      <Box
        id="utils"
        sx={{
          position: 'absolute',
          top: 85,
          left: 20,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
      >
        <Button
          variant="contained"
          sx={{ justifyContent: 'flex-start' }}
          onClick={() => moveToDestination()}
          startIcon={<PlaceIcon />}
        >
          <Typography variant='caption'>웨딩홀</Typography>
        </Button>
        <Button
          variant="contained"
          sx={{ justifyContent: 'flex-start' }}
          onClick={moveToCurrentLocation}
          startIcon={<MyLocationIcon />}
        >
          <Typography variant='caption'>현재 위치</Typography>
        </Button>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 80,
          right: 0,
          height: '100px',
          zIndex: 1000,
        }}
      >
        <Slider
          orientation="vertical"
          value={zoom}
          onChange={handleZoomChange}
          aria-labelledby="vertical-slider"
          min={6}
          max={20}
        />
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: 5,
          right: 5,
          width: 'calc(100vw - 10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: 1.5,
          borderRadius: '10px',
          zIndex: 1000,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxHeight: isExpanded ? 'calc(100vh - 75px)' : '90px',
          overflowY: 'scroll',
          transition: 'max-height 1.5s ease',
        }}
        onClick={handleToggleExpand}
      >
        <Dialog
          onClose={handleClose}
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 1 }}>
            🗺️ 약도
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 2,
              top: 2,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers sx={{ backgroundColor: 'rgb(218, 208, 196)' }}>
            <Image
              src='/location/rotuemap.svg'
              width={600}
              height={600}
              style={{ width: '100%', height: 'auto' }}
              alt=''
            />
          </DialogContent>
        </Dialog>

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '1px' }}>
            🗺️ 길 안내 <Button onClick={() => { setOpen(true) }}>약도 보기</Button>
          </Typography>
          <Typography variant='body2' sx={{ fontSize: '12px', marginTop: 0, marginLeft: 1, textShadow: '1px 1px 2px rgb(255,255,255)' }}>
            서울특별시 중구 퇴계로 115 명동 밀리오레 호텔 PH층
          </Typography>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '1px' }}>
            📱 지도 앱으로 열기
          </Typography>
          <IconButton onClick={handleNaverMapOpen}>
            <Image src={'/location/naver.webp'} width='24' height='24' alt='naver' />
          </IconButton>
          <IconButton onClick={handleKakaoMapOpen}>
            <Image src={'/location/kakao.webp'} width='24' height='24' alt='kakao' />
          </IconButton>
          <IconButton onClick={handleGoogleMapsAppOpen}>
            <Image src={'/location/google.webp'} width='24' height='24' alt='google' />
          </IconButton>
          <IconButton onClick={handleTMapAppOpen}>
            <Image src={'/location/tmap.svg'} width='24' height='24' alt='google' />
          </IconButton>
          <AppleMapsButton />
        </Box>
        <Box id="subway" sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '1px' }}>
            🚈 지하철
          </Typography>
          <Typography variant='body2'>
            명동역 5번 출구 바로 앞<br />(밀리오레 호텔 서울 명동 건물)
          </Typography>
        </Box>

        <Box id="bus" sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '1px' }}>
            🚌 버스
          </Typography>
          <Typography variant='subtitle2'>
            퇴계로2가, 명동역 정류장
          </Typography>
          <Typography variant='body2'>
            <span style={{ color: 'green' }}>7011</span> <span style={{ color: 'blue' }}>104 105 421 463 507 604</span>
          </Typography>
          <Typography variant='subtitle2'>
            명동입구 정류장
          </Typography>
          <Typography variant='body2'>
            <span style={{ color: 'green' }}>7011</span> <span style={{ color: 'blue' }}>104 421 463 507 604</span>
          </Typography>
        </Box>

        <Box id="parking">
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '1px' }}>
            🚗 주차 안내
          </Typography>
          <Typography variant='body2'>
            명동역 밀리오레 호텔 서울 명동 건물 지하주차장<br />(3시간 무료)
          </Typography>
        </Box>

        <Button
          onClick={handleToggleExpand}
          endIcon={isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          sx={{
            color: theme.palette.primary.contrastText,
            position: 'fixed',
            bottom: 5,
            right: 5,
            padding: 0.2,
            paddingRight: 1,
            borderRadius: '10px',
            zIndex: 1001,
          }}>
          {isExpanded ? '접기' : '펼치기'}
        </Button>
      </Box>
    </Box >
  );
};