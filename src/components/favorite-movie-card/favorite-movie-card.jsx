import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FavoriteMovieCard = ({ movie }) => {
  // For Modal
  const [deleteShow, setDeleteShow] = useState(false);

  const token = localStorage.getItem('myFlixClientToken');
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(token);
  const movieId = movie._id;

  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = () => setDeleteShow(true);

  const removeMovie = () => {
    console.log('clicked');
    fetch(
      `https://myflixdbrender.onrender.com/users/${user.userName}/movies/${movieId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        window.location.reload();
      })
      .catch((err) => console.log('Error is: ', err));
  };

  return (
    <>
      <Card className="h-100">
        <Card.Img variant="top" src={movie.image} className="movie-image" />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>Directed by {movie.director.name}</Card.Text>
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="link">Detials</Button>
          </Link>
          <Button variant="danger" onClick={handleDeleteShow}>
            Remove
          </Button>
        </Card.Body>
      </Card>

      <Modal show={deleteShow} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title className="ms-auto">Deregister</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure you want to remove?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant="primary" onClick={removeMovie}>
            Delete From Favorites
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FavoriteMovieCard;
