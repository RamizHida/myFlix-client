import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = ({ movie, onMovieClick }) => {
  return <div onClick={() => onMovieClick()}>{movie.title}</div>;
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
