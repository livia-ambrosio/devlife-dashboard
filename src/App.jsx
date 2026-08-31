import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MovieCard } from './components/MovieCard';
import { SearchBar } from './components/SearchBar';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const API_KEY = 'a510d2613520fb531803dd346afe628b';

  useEffect(() => {
    const fetchMovies = async () => {
      let url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`;
      
      if (searchTerm.trim() !== '') {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(searchTerm)}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh', color: '#fff' }}>
      <Header />
      <main style={{ padding: '20px' }}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h2>{searchTerm ? `Resultados para "${searchTerm}"` : 'Filmes Populares'}</h2>
        
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
          {movies.length > 0 ? (
            movies.map(movie => (
              <MovieCard 
                key={movie.id} 
                title={movie.title} 
                year={movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'} 
                image={movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                  : 'https://via.placeholder.com/500x750?text=Sem+Imagem'} 
              />
            ))
          ) : (
            <p>Nenhum filme encontrado.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;