import React from 'react';
import PropTypes from 'prop-types';

const MovieView = ({ movie, onBackClick }) => {
  return (
    <>
      <div>
        <img src={movie.img} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div className="container">
        <span>Director Info: </span>
        <p>Name: {movie.director.name}</p>
        <p>Bio: {movie.director.bio}</p>
        <p>Born in: {movie.director.birthday.slice(0, 10)}</p>
      </div>
      <div class="container">
        <span>Genre: </span>
        <p>Type: {movie.genre.name}</p>
        <p>Description: {movie.genre.description}</p>
      </div>
      <div>
        <span>Featured : </span>
        <span>{movie.featured.toString()}</span>
      </div>
      <div>
        <span>ID : </span>
        <span>{movie.id}</span>
      </div>
      <button onClick={onBackClick}>Go Back</button>
    </>
  );
};

export default MovieView;

// Prop Constrains
MovieView.propTypes = {
  movie: PropTypes.shape({
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birthday: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    id: PropTypes.string,
    featured: PropTypes.bool.isRequired,
  }),
  onBackClick: PropTypes.func.isRequired,
};
