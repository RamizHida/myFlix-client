import React from 'react';
import PropTypes from 'prop-types';

const MovieView = ({ movie, onBackClick }) => {
  return (
    <>
      <div>
        <img src={movie.image} className="movie-view-image" />
      </div>
      <div>
        <span className="movie-detials">Title: {movie.title}</span>
      </div>
      <div>
        <span className="movie-detials">Description: </span>
        <span>{movie.description}</span>
      </div>
      <div className="container">
        <span className="movie-detials">Director Info: </span>
        <p>
          <span>Name:</span> {movie.director.name}
        </p>
        <p>
          <span>Bio:</span> {movie.director.bio}
        </p>
        <p>
          <span>Born in: </span> {movie.director.birthday.slice(0, 10)}
        </p>
      </div>
      <div className="container">
        <span className="movie-detials">Genre: </span>
        <p>
          <span>Type: </span> {movie.genre.name}
        </p>
        <p>
          <span>Description: </span>
          {movie.genre.description}
        </p>
      </div>
      <div>
        <span className="movie-detials">Featured : </span>
        <span>{movie.featured.toString()}</span>
      </div>
      <div>
        <span className="movie-detials">ID : </span>
        <span>{movie.id}</span>
      </div>
      <button onClick={onBackClick} className="back-btn">
        Go Back
      </button>
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
