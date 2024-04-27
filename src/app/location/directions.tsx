'use client';

import config from '../config'

import { useState, useEffect } from 'react';

import Image from 'next/image';

import { Box, Dialog, DialogTitle, DialogContent, Typography, IconButton, Button } from "@mui/material"

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';

import { useSwipeable } from 'react-swipeable';

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
        window.open(`tmap://route?goalx=${config.location.lat}&goaly=${config.location.lng}&goalname=${config.location.name}`, '_blank');
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
                    window.open(`https://maps.apple.com/?address=%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%A4%91%EA%B5%AC%20%EC%B6%A9%EB%AC%B4%EB%A1%9C1%EA%B0%80%2024-1,%2004536&auid=14074372663880552616&ll=${config.location.lat},${config.location.lng}&lsp=9902&q=%EC%98%A8%EC%A6%88%EB%93%9C%EB%A1%AC&t=m`, '_blank');
                }
            }}
        >
            <Image src={'/location/apple.png'} width='24' height='24' alt='apple' />
        </IconButton>
    );
};

export default function Directions() {

    const [isExpanded, setIsExpanded] = useState(true);

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    useEffect(() => {
        setTimeout(() => {
            setIsExpanded(false);
        }, 1000);
    }, []);

    const swipeHandlers = useSwipeable({
        onSwipedUp: () => setIsExpanded(true),
        onSwipedDown: () => setIsExpanded(false),
        trackMouse: true
    });

    const [open, setOpen] = useState(false);

    return (
        <Box
            {...swipeHandlers} style={{ touchAction: 'none' }}
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
                overflowY: 'hidden',
                transition: 'max-height 1.5s ease',
            }}
        >
            <Dialog
                style={{ touchAction: 'none' }}
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 1 }}>
                    🗺️ 약도
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setOpen(false)}
                    sx={{
                        position: 'absolute',
                        right: 2,
                        top: 2,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers sx={{ backgroundColor: 'var(--primary-color-main)' }}>
                    <Image
                        src='/location/rotuemap.svg'
                        width={600}
                        height={600}
                        style={{ width: '100%', height: 'auto' }}
                        alt='route map'
                    />
                </DialogContent>
            </Dialog>

            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '1px' }}>
                    🗺️ 길 안내
                    <Button color='secondary' onClick={() => { setOpen(true) }}>약도 보기</Button>
                </Typography>
                <Typography variant='body2' sx={{ fontSize: '12px', marginTop: 0, marginLeft: 1, textShadow: '1px 1px 2px rgb(255,255,255)' }}>
                    {config.location.address}
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
                    <Typography style={{ color: 'green', display: 'inline', marginRight: '1em' }}>7011</Typography>
                    <Typography sx={{ display: 'inline' }} color='secondary'>104 105 421 463 507 604</Typography>
                </Typography>
                <Typography variant='subtitle2'>
                    명동입구 정류장
                </Typography>
                <Typography variant='body2'>
                    <Typography style={{ color: 'green', display: 'inline', marginRight: '1em' }}>7011</Typography>
                    <Typography sx={{ display: 'inline' }} color='secondary'>104 421 463 507 604</Typography>
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
                color='secondary'
                onClick={handleToggleExpand}
                endIcon={isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                sx={{
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
        </Box>)
}