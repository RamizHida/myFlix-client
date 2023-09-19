import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <img src={movie.image} />
      <div>{movie.title}</div>
      <Button variant="primary" onClick={() => onMovieClick()}>
        Details
      </Button>
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
  onMovieClick: PropTypes.func.isRequired,
};
