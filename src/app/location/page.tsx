'use client';

import config from '../config'

import { Menu } from '../menu';

import { useState, useEffect } from 'react';

import { Button, Box, Slider, Typography } from '@mui/material';

import MyLocationIcon from '@mui/icons-material/MyLocation';
import PlaceIcon from '@mui/icons-material/Place';

import dynamic from 'next/dynamic';
const Directions = dynamic(() => import('./directions'), { ssr: false });

export default function Page() {
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [zoom, setZoom] = useState(16);

  const handleZoomChange = (event: any, newValue: any) => {
    setZoom(newValue);
    if (map) {
      map.setZoom(newValue);
    }
  };

  const showDestinationInfo = (map: naver.maps.Map) => {
    const infoWindow = new naver.maps.InfoWindow({ content: '<div style="padding:20px; text-align:center;">' + '여기로 오세요😊<br />👰🏻🧡🤵🏻' + '</div>' });
    infoWindow.open(map, new naver.maps.LatLng(config.location.lat, config.location.lng));
  }

  const moveToDestination = () => {
    if (!map) return;
    map.setCenter(new naver.maps.LatLng(config.location.lat, config.location.lng));
    showDestinationInfo(map);
  };

  const moveToCurrentLocation = () => {
    if (map && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(location);
        const infoWindow = new naver.maps.InfoWindow({ content: '<div style="padding:20px;">' + '지금은 여기 계시네요? 😁' + '</div>' });
        infoWindow.open(map, location);
      }, (error) => {
        const center = map.getCenter();
        const infoWindow = new naver.maps.InfoWindow({ content: '<div style="padding:20px;">' + '<h5 style="margin-bottom:5px;color:#f00;">위치 정보 획득 실패</h5>' + "x: " + center.x + "<br />y: " + center.y + '</div>' });
        infoWindow.open(map, center);
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
        center: new naver.maps.LatLng(config.location.lat, config.location.lng),
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
      <Menu
        opacity={0.8}
        title={<Typography
          variant='h6'
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <MyLocationIcon sx={{ marginRight: 1 }} />
          오시는길
        </Typography>}
      />
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
          color='secondary'
          variant="contained"
          sx={{ justifyContent: 'flex-start' }}
          onClick={() => moveToDestination()}
          startIcon={<PlaceIcon />}
        >
          <Typography variant='caption'>웨딩홀</Typography>
        </Button>
        <Button
          color='secondary'
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

      <Directions />
    </Box >
  );
};