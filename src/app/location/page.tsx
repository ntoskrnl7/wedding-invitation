'use client';

import React from 'react';
import { Button, Box, Slider, Typography } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PlaceIcon from '@mui/icons-material/Place';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import Image from 'next/image';

import IconButton from '@mui/material/IconButton';

import { useMenuState } from '../menu/state';

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
  if (ThisMenuState !== menuState) {
    setMenuState(() => ThisMenuState);
  }

  const lat = 37.5610621;
  const lng = 126.9845390;

  const [map, setMap] = React.useState<naver.maps.Map | null>(null);
  const [zoom, setZoom] = React.useState(16);

  const handleZoomChange = (event: any, newValue: any) => {
    setZoom(newValue);
    if (map) {
      map.setZoom(newValue);
    }
  };

  const [isExpanded, setIsExpanded] = React.useState(true);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNaverMapOpen = () => {
    window.open(`nmap://map?lat=${lat}&lng=${lng}&appname=he-jk.wedding.invitation.app`, '_blank');
  };

  const handleKakaoMapOpen = () => {
    window.open(`kakaomap://look?p=${lat},${lng}`, '_blank');
  };

  const handleGoogleMapsAppOpen = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
  };

  const AppleMapsButton = () => {
    if (! /Mac|iPod|iPhone|iPad/.test(window.navigator.userAgent)) {
      return null;
    }
    return (
      <IconButton onClick={() => window.open(`http://maps.apple.com/?q=${lat},${lng}`, '_blank')}>
        <Image src={'/location/apple.png'} width='24' height='24' alt='naver' />
      </IconButton>
    );
  };

  const showDestinationInfo = (map: naver.maps.Map) => {
    const infowindow = new naver.maps.InfoWindow({ content: '<div style="padding:20px; text-align:center;">' + '여기입니다😊<br />👰🏻🧡🤵🏻' + '</div>' });
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

  React.useEffect(() => {
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
          top: 80,
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
          웨딩홀
        </Button>
        <Button
          variant="contained"
          sx={{ justifyContent: 'flex-start' }}
          onClick={moveToCurrentLocation}
          startIcon={<MyLocationIcon />}
        >
          현재 위치
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
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          padding: 2,
          borderRadius: '10px',
          zIndex: 1000,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxHeight: isExpanded ? '100%' : '60px',
          overflowY: 'auto',
          transition: 'max-height 0.3s ease',
        }}
      >

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '1px' }}>
            🗺️ 길 안내
          </Typography>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '1px' }}>
            📱 지도 앱으로 열기
          </Typography>
          <Typography variant='body2'>
            <IconButton onClick={handleNaverMapOpen}>
              <Image src={'/location/naver.webp'} width='24' height='24' alt='naver' />
            </IconButton>
            <IconButton onClick={handleKakaoMapOpen}>
              <Image src={'/location/kakao.webp'} width='24' height='24' alt='kakao' />
            </IconButton>
            <IconButton onClick={handleGoogleMapsAppOpen}>
              <Image src={'/location/google.webp'} width='24' height='24' alt='google' />
            </IconButton>
            <AppleMapsButton />
          </Typography>
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
            position: 'fixed',
            bottom: 5,
            right: 5,
            borderRadius: '10px',
            zIndex: 1001,
          }}>
          {isExpanded ? '접기' : '펼치기'}
        </Button>
      </Box>
    </Box >
  );
};