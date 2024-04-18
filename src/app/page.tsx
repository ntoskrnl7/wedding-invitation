import { Menu } from './menu';

import ConstructionIcon from '@mui/icons-material/Construction';
import { Box, Typography } from '@mui/material';
import { CSSProperties } from 'react';

export default function Page() {
  const styles: {
    container: CSSProperties,
    section: CSSProperties
  } = {
    container: {
      height: '100%',
      overflowY: 'scroll' as const,
      scrollSnapType: 'y mandatory' as const,
      scrollBehavior: 'smooth' as const
    },
    section: {
      height: '100%',
      scrollSnapAlign: 'start' as const,
    }
  };

  return (
    <>
      <Menu title={<></>} opacity={0} />
      <Box style={{
        height: '100vh'
      }}>
        <Box style={{ ...styles.container, backgroundColor: 'var(--primary-color-main)', }}>
          <Box style={{ ...styles.section }}>
            <Box style={{ height: '100%', display: 'grid', alignItems: 'center', justifyItems: 'center' }}>
              <ConstructionIcon color='warning' style={{ fontSize: '100px' }} />
              <Typography variant="body1" style={{ textAlign: 'center' }}>현재 페이지는 준비 중입니다.😭<br />24년 4월 17일에 완료 예정입니다.😁</Typography>
            </Box>
          </Box>
          <Box style={{ ...styles.section }}>
            두번째 페이지
          </Box>
          <Box style={{ ...styles.section }}>
            세번째 페이지
          </Box>
        </Box>
      </Box >
    </>
  );
}