import Typography from "@mui/material/Typography";

export default function NotFound() {
  return (
    <div style={{ height: '100vh', display: 'grid', alignItems: 'center', justifyItems: 'center' }}>
      <Typography variant="h6" style={{ textAlign: 'center' }}>페이지를 찾을 수 없습니다. 🤔</Typography>
    </div>
  );
}