import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const token = localStorage.getItem('myFlixClientToken');
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(token);
  const movieId = movie._id;

  const addToFavorite = () => {
    console.log(movieId);
    fetch(
      `https://myflixdbrender.onrender.com/users/${user.userName}/movies/${movieId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((updatedUser) => {
        // Make sure to not add same movie to favorite movie list
        let uniqueMovies = [];
        updatedUser.favoriteMovies.forEach((m) => {
          if (!uniqueMovies.includes(m)) {
            uniqueMovies.push(m);
          }
        });

        updatedUser.favoriteMovies = uniqueMovies;
        return localStorage.setItem('user', JSON.stringify(updatedUser));
      })
      .catch((err) => console.log('Error is: ', err));
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} className="movie-image" />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>Directed by {movie.director.name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Detials</Button>
        </Link>
        <Button variant="secondary" onClick={addToFavorite}>
          Add To Favorites
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;

// Prop Constraints
MovieCard.propTypes = {
  movie: PropTypes.shape({
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      birthday: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    featured: PropTypes.bool,
    id: PropTypes.string,
  }).isRequired,
};
