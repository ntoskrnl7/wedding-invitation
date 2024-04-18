import PaymentIcon from '@mui/icons-material/Payment';
import { Container, Typography, Box } from '@mui/material';

import { Menu } from '../menu';

import dynamic from 'next/dynamic';

const KakaoPayButton = dynamic(() => import('./kakao-pay-button'), { ssr: false });
const CopyAccountButton = dynamic(() => import('./copy-account-button'), { ssr: false });

export default function Page() {
  return (
    <>
      <Menu
        opacity={0.8}
        title={
          <Typography
            variant='h6'
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <PaymentIcon sx={{ marginRight: 1 }} />
            마음 전하기
          </Typography>
        }
      />
      <Box style={{
        marginTop: 80,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 80px)',
      }}>
        <Typography variant='subtitle1' textAlign={'center'}>참석이 어려우신 분들을 위해<br />계좌번호를 기재하였습니다.<br />너그러운 마음으로 양해 부탁드립니다.</Typography >
        <Container maxWidth="lg" style={{ marginTop: '8vh' }} sx={{
          display: 'flex',
          flexDirection: 'column', // 세로 배치
          justifyContent: 'center', // 세로 중앙 정렬
          alignItems: 'center', // 항목들을 가로 중앙에 정렬
          minHeight: 'calc(100vh - 300px)', // 컨테이너의 최소 높이를 화면 높이와 동일하게 설정 (메뉴바 높이, 설명글 높이를 제외해야함)
          gap: 10, // 세로 모드에서 섹션 사이의 간격
          mt: 4,
          '@media (orientation: landscape)': {
            flexDirection: 'row', // 가로 모드에서 행 방향으로 항목 배치
            justifyContent: 'space-around', // 가로 모드에서 항목 사이의 간격을 조정
            gap: 2, // 가로 모드에서 섹션 사이의 간격을 조정
          }
        }}>
          {/* 신랑 섹션 */}
          <Box sx={{
            textAlign: 'center',
            '@media (orientation: landscape)': { width: '40%' }
          }}>
            <Typography variant="h4" component="h2" gutterBottom>🤵🏻 신랑</Typography>
            <Typography variant="subtitle2" sx={{ marginTop: 2, fontWeight: 'bold' }}>계좌 번호</Typography>
            <Typography variant="body2">
              국민은행 471002-04-024875 (이중광)
              <CopyAccountButton account='471002-04-024875' />
            </Typography>
            <KakaoPayButton url='https://link.kakaopay.com/_/5pRLzY_'></KakaoPayButton>
          </Box>

          {/* 신부 섹션 */}
          <Box sx={{
            textAlign: 'center',
            '@media (orientation: landscape)': { width: '40%' }
          }}>
            <Typography variant="h4" component="h2" gutterBottom>👰🏻 신부</Typography>
            <Typography variant="subtitle2" sx={{ marginTop: 2, fontWeight: 'bold' }}>계좌 번호</Typography>
            <Typography variant="body2">국민은행 592202-01-727975 (박하은)
              <CopyAccountButton account='592202-01-727975' />
            </Typography>
            <KakaoPayButton url='https://link.kakaopay.com/_/4qDXKCw'></KakaoPayButton>
          </Box>
        </Container >
      </Box >
    </>
  );
}