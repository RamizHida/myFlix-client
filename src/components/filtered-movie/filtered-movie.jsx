import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const FilterMovie = ({ movie }) => {
  const removeFilter = () => {
    localStorage.removeItem('filteredMovie');
    window.location.reload();
  };

  const filteredMovie = movie[0];
  return (
    <>
      <div>
        <img src={filteredMovie.image} className="movie-view-image-filter" />
      </div>
      <div>
        <span className="property-name">Title: </span>
        <span> {filteredMovie.title}</span>
      </div>
      <div>
        <span className="property-name">Description: </span>
        <span className="property-info">{filteredMovie.description}</span>
      </div>
      <div className="container-filter">
        <span>Director Info: </span>
        <p>
          <span>Name:</span> {filteredMovie.director.name}
        </p>
        <p className="property-info">
          <span>Bio:</span> {filteredMovie.director.bio}
        </p>
        <p>
          <span>Born in: </span> {filteredMovie.director.birthday.slice(0, 10)}
        </p>
      </div>
      <div className="container-filter">
        <span>Genre: </span>
        <p>
          <span>Type: </span> {filteredMovie.genre.name}
        </p>
        <p className="property-info">
          <span>Description: </span>
          {filteredMovie.genre.description}
        </p>
      </div>
      <div>
        <span className="property-name">Featured : </span>
        <span>{filteredMovie.featured.toString()}</span>
      </div>
      <div>
        <span className="property-name">ID : </span>
        <span>{filteredMovie.id}</span>
      </div>
      <Link to={'/'}>
        <Button className="back-Button" onClick={removeFilter}>
          Remove Filter
        </Button>
      </Link>
    </>
  );
};

export default FilterMovie;
