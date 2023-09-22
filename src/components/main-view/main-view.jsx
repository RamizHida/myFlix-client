import React, { useEffect, useState } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import SignUpView from '../signup-view/signup-vew';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('userName'));
  // const storedtoken = JSON.parse(localStorage.getItem('myFlixClientToken'));
  const storedtoken = localStorage.getItem('myFlixClientToken');

  const [movies, setMovies] = useState([]);
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
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignUpView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;
