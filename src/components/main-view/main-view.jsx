import React, { useEffect, useState } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import SignUpView from '../signup-view/signup-vew';

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedtoken = JSON.parse(localStorage.getItem('token'));

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedtoken ? storedtoken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://myflixdbrender.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
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
  }, [token]);

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

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
            localStorage.clear();
          }}
        />
        or
        <SignUpView />
      </>
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
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
        }}
      >
        Logout
      </button>
    </>
  );
};

export default MainView;
