'use client';

import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import { List, ListItemText, ListItemButton, ListItem, IconButton, AppBar, Toolbar, Box } from '@mui/material';
import { ArrowBack, Comment, EventAvailable, HowToReg, Menu, MyLocation, Payment, PhotoLibrary } from '@mui/icons-material';

import { useGlobalState } from './state';

import './menu.scss';

export default function MenuPage() {
    const { globalState, setGlobalState } = useGlobalState();

    const router = useRouter();
    return (
        <div style={{ display: 'grid', alignItems: 'center', justifyItems: 'center', color: 'white', textShadow: '1px 1px 2px rgba(40,40,40, 0.5)', backgroundColor: 'rgba(0,0,0,0.5)', height: '100%' }}>
            <List className="box">
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
                            setGlobalState(() => ({ title: <>일시</> }));
                            router.push('/date');
                        }}
                    >
                        <EventAvailable />
                        <Typography variant="h6">- DATE -</Typography>
                        <Typography variant="subtitle2">일시</Typography>
                    </ListItemText>
                </ListItemButton>

                <ListItemButton style={{ width: '100%' }}>
                    <ListItemText
                        style={{ textAlign: 'center' }}
                        onClick={() => {
                            setGlobalState(() => ({ title: <>앨범</> }));
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
                            setGlobalState(() => ({ title: <>오시는길</> }));
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
                            setGlobalState(() => ({ title: <>마음 전하기</> }));
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
                            setGlobalState(() => ({ title: <>참석 여부</> }));
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
                            setGlobalState(() => ({ title: <>방명록</> }));
                            router.push('/guest');
                        }}
                    >
                        <Comment />
                        <Typography variant="h5">- GUEST BOOK -</Typography>
                        <Typography variant="subtitle2">방명록</Typography>
                    </ListItemText>
                </ListItemButton>
            </List>
        </div>
    );
}