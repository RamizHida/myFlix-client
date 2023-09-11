import React from 'react';

const MovieCard = ({ movie, onMovieClick }) => {
  return <div onClick={() => onMovieClick()}>{movie.title}</div>;
};

export default MovieCard;
