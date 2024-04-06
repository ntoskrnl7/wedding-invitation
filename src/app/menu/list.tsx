'use client';

import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import { List, ListItemText, ListItemButton } from '@mui/material';
import { Comment, EventAvailable, HowToReg, MyLocation, Payment, PhotoLibrary } from '@mui/icons-material';
import './menu.scss';

export default function MenuPage() {
    const router = useRouter();
    return (
        <div style={{ paddingTop: '30px', display: 'grid', alignItems: 'center', justifyItems: 'center', color: 'white', textShadow: '1px 1px 2px rgba(40,40,40, 0.5)', backgroundColor: 'rgba(0,0,0,0.5)', height: '100%' }}>
            <List
                className="box">
                <ListItemButton style={{ width: '100%' }}>

                    <ListItemText
                        style={{ textAlign: 'center' }}
                        onClick={() => {
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
                            router.push('/rsup');
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
            </List>
        </div>
    );
}