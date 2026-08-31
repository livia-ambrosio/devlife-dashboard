export function MovieCard({ title, year, image }) {
  return (
    <div style={{
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '10px',
      width: '180px',
      backgroundColor: '#222',
      color: '#fff',
      textAlign: 'center'
    }}>
      <img 
        src={image} 
        alt={title} 
        style={{ width: '100%', borderRadius: '4px', height: '250px', objectFit: 'cover' }} 
      />
      <h3 style={{ fontSize: '16px', margin: '10px 0 5px' }}>{title}</h3>
      <p style={{ color: '#aaa', fontSize: '14px', margin: 0 }}>{year}</p>
    </div>
  );
}