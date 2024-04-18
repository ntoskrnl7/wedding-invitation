import { Menu } from '../menu';

import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Typography } from '@mui/material';

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
            <HowToRegIcon sx={{ marginRight: 1 }} />
            참석 여부
          </Typography>
        }
      />
      <iframe title='rsvp' style={{ marginTop: 60, border: 0, height: 'calc(100vh - 60px)', width: '100vw' }} src='https://joey.team/block/?id=2WKGeXeWJ6XfZ7XijM2azA5FZrj2&block_id=UdfwEPBuwGt3GbXhWmFt' />
    </>
  );
}