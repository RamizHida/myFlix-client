import React, { useState } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

const MainView = () => {
  const [movies, setMovies] = useState([
    {
      title: 'Wrong Turn',
      director: 'Rob Schmidt',
      description:
        'Chris and a group of five friends are left stranded deep in the middle of the woods after their cars collide. As they venture deeper into the woods, they face an uncertain and bloodcurdling fate.',
      genre: 'Thriller',
      img: '../../images/wrong-turn.png',
      id: 1,
    },
    {
      title: '300',
      director: 'Zack Synder',
      description:
        'King Leonidas of Sparta and a force of 300 men fight the Persians at Thermopylae in 480 B.C.',
      genre: 'Action',
      img: '../../images/300.png',
      id: 2,
    },
    {
      title: 'Troy',
      director: 'Wolfgang Petersen',
      description:
        "An adaptation of Homer's great epic, the film follows the assault on Troy by the united Greek forces and chronicles the fates of the men involved.",
      genre: 'Drama',
      img: '../../images/troy.png',
      id: 3,
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => {
          setSelectedMovie(null);
        }}
      />
    );
  }

  if (movies.length === 0) {
    return <div>No movies avalible!</div>;
  }

  return (
    <>
      <div>
        {movies.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            onMovieClick={(newSelectedMovie) =>
              setSelectedMovie(newSelectedMovie)
            }
          />
        ))}
      </div>
    </>
  );
};

export default MainView;
