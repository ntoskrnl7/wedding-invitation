import Book from './book';

export default function Page() {
  return (
    <main style={{ height: 'auto', minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <div className='warnning-message'>화면을 가로로 돌려서 보시는것을 권장합니다.</div>
      <Book />
    </main >
  );
}
