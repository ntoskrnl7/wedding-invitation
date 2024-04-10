'use client';

import React from 'react';
import { Button, Box, Slider, Typography } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PlaceIcon from '@mui/icons-material/Place';

const NaverMapPage = () => {
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
        if (! /Mac|iPod|iPhone|iPad/.test(navigator.userAgent)) {
            return null;
        }
        return (
            <Button
                variant="contained"
                startIcon={<img src={'/location/apple.png'} alt="Icon" style={{ width: 24, height: 24 }} />}
                style={{ margin: 8, backgroundColor: 'white', color: 'black' }}
                onClick={() => window.open(`http://maps.apple.com/?q=${lat},${lng}`, '_blank')}
            >
                Apple 지도
            </Button>
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
        <>
            <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                    position: 'relative',
                }}
            >
                <Box id="map" style={{ width: '100%', height: '100%' }}></Box>


                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 20,
                        left: 20, // 왼쪽 하단에 위치
                        zIndex: 1000, // 지도 위에 버튼이 표시되도록 z-index 설정
                        '& > button:not(:last-child)': {
                            marginRight: '10px', // 마지막 버튼을 제외한 모든 버튼에 오른쪽 마진 적용
                        },
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => moveToDestination()}
                        startIcon={<PlaceIcon />}
                    >
                        목적지
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={moveToCurrentLocation}
                        startIcon={<MyLocationIcon />}
                    >
                        현재 위치
                    </Button>
                </Box>

                <Box
                    sx={{
                        position: 'absolute',
                        top: 50,
                        right: 16,
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
                        position: 'absolute',
                        bottom: 20,
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0px',
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<img src={'/location/naver.webp'} alt="Icon" style={{ width: 24, height: 24 }} />}
                        style={{ margin: 8, backgroundColor: "#03c75a", color: "#ffffff" }}
                        onClick={handleNaverMapOpen}
                    >
                        네이버 지도
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<img src={'/location/kakao.webp'} alt="Icon" style={{ width: 24, height: 24 }} />}
                        style={{ margin: 8, backgroundColor: "#FEE500", color: 'black' }}
                        onClick={handleKakaoMapOpen}
                    >
                        카카오맵
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<img src={'/location/google.webp'} alt="Icon" style={{ width: 24, height: 24 }} />}
                        style={{ margin: 8, backgroundColor: 'white', color: 'black' }}
                        onClick={handleGoogleMapsAppOpen}
                    >
                        Google 지도
                    </Button>

                    <AppleMapsButton />
                </Box>

                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        width: 300, // or any desired width
                        maxHeight: '60%', // 최대 높이 설정
                        overflowY: 'auto', // 내용이 넘칠 경우 스크롤 가능
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', // 반투명한 흰색 배경
                        padding: 2,
                        borderRadius: '10px', // 경계선 둥글기
                        zIndex: 1000, // 지도 위에 표시되도록 z-index 설정
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 그림자 효과
                    }}
                >
                    <Typography variant="body1" gutterBottom>
                        지하철
                    </Typography>
                    <Typography variant="body2">
                        명동역 5번 출구
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        버스
                    </Typography>
                    <Typography variant="body2">
                        퇴계로..<br />
                        명동입구 : 
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default NaverMapPage;