import ConstructionIcon from '@mui/icons-material/Construction';
import { Typography } from '@mui/material';

export default function Home() {
    return (
        <div style={{ paddingTop: '30vh', width: '100%', height: '100%', display: 'grid', alignItems: 'center', justifyItems: 'center' }}>
            <ConstructionIcon color='warning' style={{ fontSize: '100px' }} />
            <Typography variant="body1" style={{ textAlign: 'center' }}>현재 페이지는 준비 중입니다.😭<br />24년 4월 15일에 완료 예정입니다.😁</Typography>
        </div>
    );
}