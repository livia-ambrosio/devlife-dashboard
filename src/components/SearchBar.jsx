export function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Digite o nome de um filme..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '10px 15px',
          borderRadius: '6px',
          border: '1px solid #444',
          backgroundColor: '#222',
          color: '#fff',
          fontSize: '16px',
          outline: 'none'
        }}
      />
    </div>
  );
}