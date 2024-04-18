import { Menu } from '../menu';

import { Typography } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

export default function Page() {
  return (
    <>
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
          <CommentIcon sx={{ marginRight: 1 }} />
          방명록
        </Typography>} />
      <div style={{ position: 'fixed', top: 0, backgroundColor: 'white', height: 60, width: '100vw' }} />
      <iframe title='guest' style={{ marginTop: 10, zIndex: 2000, border: 0, height: '100vh', width: '100vw' }} src='https://joey.team/block?block_id=ZKSCq2LqiYzSCpDiA5NM&id=2WKGeXeWJ6XfZ7XijM2azA5FZrj2' />
    </>
  );
}