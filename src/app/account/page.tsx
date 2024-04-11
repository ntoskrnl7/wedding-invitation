'use client';

import PaymentIcon from '@mui/icons-material/Payment';
import { useMenuState } from '../menu/state';
import { Button, Container, Typography, Stack, Box, IconButton } from '@mui/material';
import Image from 'next/image';

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
      <PaymentIcon sx={{ marginRight: 1 }} />
      마음 전하기
    </Typography>,
  opacity: 0
};

const KakaoPayButton = (props: { url: string }) => {
  return (
    <IconButton onClick={() => window.open(props.url, '_blank')}>
      <Image src={'/account/kakao.png'} width='168' height='48' alt='naver' />
    </IconButton>
  );
}
const NaverPayButton = () => {
  return (
    <IconButton onClick={() => window.open(`http://maps.apple.com`, '_blank')}>
      <Image src={'/account/naver.svg'} width='168' height='48' alt='naver' />
    </IconButton>
  );
}

export default function Page() {
  const { menuState, setMenuState } = useMenuState();
  if (ThisMenuState !== menuState) {
    setMenuState(() => ThisMenuState);
  }

  return (
    <Container maxWidth="lg" sx={{
      display: 'flex',
      flexDirection: 'column', // 세로 배치
      justifyContent: 'center', // 세로 중앙 정렬
      alignItems: 'center', // 항목들을 가로 중앙에 정렬
      minHeight: 'calc(100vh - 30px)', // 컨테이너의 최소 높이를 화면 높이와 동일하게 설정 (메뉴바 높이를 제외해야함)
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
        width: '80%', // 세로 모드에서 섹션의 너비를 조정
        textAlign: 'center',
        '@media (orientation: landscape)': { width: '40%' } // 가로 모드에서 섹션의 너비를 40%로 조정
      }}>
        <Typography variant="h4" component="h2" gutterBottom>🤵 신랑</Typography>
        <Typography variant="subtitle2" sx={{ marginTop: 2, fontWeight: 'bold' }}>계좌 번호</Typography>
        <Typography variant="body2" sx={{ marginBottom: 3 }}>국민은행 94659583645 (이중광)</Typography>
        <KakaoPayButton url='https://link.kakaopay.com/_/5pRLzY_'></KakaoPayButton>
        <NaverPayButton></NaverPayButton>
      </Box>

      {/* 신부 섹션 */}
      <Box sx={{
        width: '80%', // 세로 모드에서 섹션의 너비를 조정
        textAlign: 'center',
        '@media (orientation: landscape)': { width: '40%' } // 가로 모드에서 섹션의 너비를 40%로 조정
      }}>
        <Typography variant="h4" component="h2" gutterBottom>👰 신부</Typography>
        <Typography variant="subtitle2" sx={{ marginTop: 2, fontWeight: 'bold' }}>계좌 번호</Typography>
        <Typography variant="body2" sx={{ marginBottom: 3 }}>국민은행 592202-01-727975 (박하은)</Typography>
        <KakaoPayButton url='https://link.kakaopay.com/_/4qDXKCw'></KakaoPayButton>
        <NaverPayButton></NaverPayButton>
      </Box>
    </Container>
  );
}