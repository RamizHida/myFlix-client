import React, { useEffect, useState } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import SignUpView from '../signup-view/signup-vew';
import ProfileView from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  // const storedtoken = JSON.parse(localStorage.getItem('myFlixClientToken'));
  const storedtoken = localStorage.getItem('myFlixClientToken');

  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedtoken ? storedtoken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    getMovies();
  }, [token]);

  const getMovies = () => {
    fetch('https://myflixdbrender.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((movieList) => {
        const moviesFromAPI = movieList.map((movie) => {
          console.log(movie, movie.featured);
          return {
            _id: movie._id,
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
  };

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
                        <MovieCard movie={movie} getMovies={getMovies} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    <Col className="mb-4 card--body" md={3}>
                      <ProfileView movies={movies} />
                    </Col>
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
