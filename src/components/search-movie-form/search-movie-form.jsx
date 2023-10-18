import { filter } from 'lodash';
import React from 'react';
import { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const SearchMovieForm = ({ movies, setMovies }) => {
  const [specificMovie, setSpecificMovie] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (specificMovie.length === 0) {
      return alert('Please type a movie title');
    }
    filterMovie = movies.filter((movie) => movie.title === specificMovie);
    if (filterMovie.length === 0) {
      return alert('No Such Movie Availble');
    }
    setMovies(filterMovie);
    localStorage.setItem('filteredMovie', JSON.stringify(filterMovie));
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="formSearch">
        <FormControl
          placeholder="Search for movie by title"
          type="text"
          value={specificMovie}
          onChange={(e) => setSpecificMovie(e.target.value)}
          className="searchMovie"
        />
        <Button type="submit" className="btnSearch">
          Search
        </Button>
      </Form>
    </>
  );
};

export default SearchMovieForm;
