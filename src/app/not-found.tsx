import { Box, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box style={{ height: '100vh', display: 'grid', alignItems: 'center', justifyItems: 'center' }}>
      <Typography variant="h6" style={{ textAlign: 'center' }}>페이지를 찾을 수 없습니다. 🤔</Typography>
    </Box>
  );
}