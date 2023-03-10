import {useState,useEffect} from 'react';
import {api} from '../services/api';
import {MovieCard} from './MovieCard';


interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
  Actors:string;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface ContentProps{
  selectedGenreId: number;
  selectedGenre:GenreResponseProps;
}
export function Content({ selectedGenreId,selectedGenre }:ContentProps) {

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);
  
  const [movies, setMovies] = useState<MovieProps[]>([]);


  return(
  <div className="container">
    <header>
      <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
    </header>

    <main>
      <div className="movies-list">
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} actors={movie.Actors}/>
        ))}
      </div>
    </main>
  </div>
  )
}