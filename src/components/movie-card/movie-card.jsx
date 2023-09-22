import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    // <Card className="h-100">
    //   <img src={movie.image} />
    //   <div>{movie.title}</div>
    //   <Button variant="primary" onClick={() => onMovieClick()}>
    //     Details
    //   </Button>
    // </Card>
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} className="movie-image" />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>Directed by {movie.director.name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Detials</Button>
        </Link>
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
