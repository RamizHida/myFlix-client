import React, { useEffect, useState } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import SignUpView from '../signup-view/signup-vew';
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('userName'));
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

  //   if (selectedMovie) {
  //     return (
  //       <MovieView
  //         movie={selectedMovie}
  //         onBackClick={() => {
  //           setSelectedMovie(null);
  //         }}
  //       />
  //     );
  //   }

  //   if (!user) {
  //     return (
  //       <>
  //         <LoginView
  //           onLoggedIn={(user, token) => {
  //             setUser(user);
  //             setToken(token);
  //           }}
  //         />
  //         or
  //         <SignUpView />
  //       </>
  //     );
  //   }

  //   if (movies.length === 0) {
  //     return <div>No movies avalible!</div>;
  //   }

  //   return (
  //     <>
  //       <div>
  //         {movies.map((movie) => (
  //           <MovieCard
  //             movie={movie}
  //             key={movie.id}
  //             onMovieClick={() => setSelectedMovie(movie)}
  //           />
  //         ))}
  //       </div>
  //       <button
  //         onClick={() => {
  //           setUser(null);
  //           setToken(null);
  //           localStorage.clear();
  //         }}
  //       >
  //         Logout
  //       </button>
  //     </>
  //   );
  // };

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <div className="separate">or</div>
          <SignUpView />
        </Col>
      ) : selectedMovie ? (
        <Col>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => {
              setSelectedMovie(null);
            }}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col key={movie.id} className="mb-4" md={4}>
              <MovieCard
                movie={movie}
                onMovieClick={() => setSelectedMovie(movie)}
              />
            </Col>
          ))}
          <Button
            variant="primary"
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
            className="logout"
          >
            Logout
          </Button>
        </>
      )}
    </Row>
  );
};

export default MainView;
