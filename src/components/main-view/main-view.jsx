import React, { useEffect, useState } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch('https://myflixdbrender.onrender.com/movies')
      .then((res) => res.json())
      .then((movieList) => {
        const moviesFromAPI = movieList.map((movie) => {
          console.log(movie, movie.featured);
          return {
            director: {
              name: movie.Director.name,
              bio: movie.Director.bio,
              birthday: movie.Director.birthDay,
            },
            genre: {
              name: movie.Genre.name,
              description: movie.Genre.description,
            },
            title: movie.movieTitle,
            description: movie.description,
            image: movie.imagePath,
            featured: movie.featured,
            id: movie.movieId,
          };
        });

        setMovies(moviesFromAPI);
      })
      .catch((err) => console.log('Something went wrong: ' + err));
  }, []);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => {
          setSelectedMovie(null);
        }}
      />
    );
  }

  if (movies.length === 0) {
    return <div>No movies avalible!</div>;
  }

  return (
    <>
      <div>
        {movies.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            onMovieClick={() => setSelectedMovie(movie)}
          />
        ))}
      </div>
    </>
  );
};

export default MainView;
