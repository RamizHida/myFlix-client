import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MovieCard from '../movie-card/movie-card';
import FavoriteMovieCard from '../favorite-movie-card/favorite-movie-card';

import React from 'react';

function ProfileView({ movies }) {
  const [fromProfile, setFromProfile] = useState('/');

  const [user, setUser] = useState([]);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  // For Modal
  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = () => setDeleteShow(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = localStorage.getItem('myFlixClientToken');

  const getProfileFunction = () => {
    if (!localStorage.getItem('user')) return;

    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user);

    fetch(
      `https://my-flix-66mnayibm-ramizhidas-projects.vercel.app/users/${parsedUser._id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
        console.log(user);
      })
      .catch((err) => console.log('Something went wrong: ' + err));
  };

  useEffect(() => {
    getProfileFunction();
  }, []);

  useEffect(() => {
    if (user) {
      setUserName(user.userName);
      setEmail(user.userEmail);
      if (user.userBirthDate) {
        setBirthday(user.userBirthDate.slice(0, 10));
      }
      setPassword(user.password);
      let favoriteMovies = movies.filter((m) =>
        JSON.parse(localStorage.getItem('user')).favoriteMovies.includes(m._id)
      );
    }
  }, [user]);

  const updateUser = (event) => {
    event.preventDefault();

    if (!password) {
      alert('Password is required!');
      return;
    }

    if (!userName) {
      alert('User name is required!');
      return;
    }

    const form = event.target; // Get the form reference
    if (!form.checkValidity()) {
      form.classList.add('was-validated'); // Adds Bootstrap styles to show validation errors
      return;
    }

    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user);

    const data = {
      userName: userName,
      password: password,
      userEmail: email,
      BirthDate: birthday,
    };
    fetch(
      `https://my-flix-66mnayibm-ramizhidas-projects.vercel.app/users/${parsedUser.userName}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        let error = updatedUser.errors;
        if (error) {
          console.log(error);
          alert('Invalid Input values. Please try again.');
          window.location.reload();
          return;
        } else {
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(localStorage.getItem('user'));
          alert('Your account is updated');
          window.location.reload();
        }
      })
      .catch((err) => console.log('The following error occured: ' + err));
  };

  const deleteAccount = () => {
    fetch(
      'https://my-flix-66mnayibm-ramizhidas-projects.vercel.app/users/' +
        userName,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      }
    )
      .then((res) => {
        res.json;
      })
      .then((data) => {
        setUser(null);
        localStorage.clear();
        window.location.reload();
      })
      .catch((err) => console.log('Failed to Delete: ' + err));
  };

  let favoriteMovies = movies.filter((m) =>
    JSON.parse(localStorage.getItem('user')).favoriteMovies.includes(m._id)
  );

  return (
    <>
      <Row className="profile-info">
        <Col>
          <Card className="card-body card-cont mt-2 mb-4">
            <Card.Body className="profile-cont">
              <Card.Title>Profile Info</Card.Title>
              <Card.Text>
                Username: {userName || 'Loading...'} <br />
                Email: {email || 'Loading...'} <br />
                Birthday: {birthday || 'Loading...'}
                {/* Password: {password} */}
                <br />
              </Card.Text>
              <Button
                variant="primary"
                className="m-2"
                onClick={() => {
                  handleShow();
                }}
              >
                Update Profile
              </Button>
              <Button
                variant="danger"
                className="m-2"
                onClick={() => {
                  handleDeleteShow();
                }}
              >
                Delete Account
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col className="mb-4 favorite--movie_card" key={movie.id} md={3}>
            <FavoriteMovieCard movie={movie} />
          </Col>
        ))}
      </Row>

      {/* <Form onSubmit={updateUser} noValidate className="needs-validation"> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="ms-auto">Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={updateUser} className="needs-validation">
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder={'Must be at least 5 Characters'}
                defaultValue={userName}
                minLength="5"
                onChange={(e) => setUserName(e.target.value)}
                required
                className="form-control"
              />
              <div className="invalid-feedback">
                Username must be at least 5 characters long.
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                placeholder="Enter your new password"
                onChange={(e) => setPassword(e.target.value)}
                minLength="5"
                className="form-control"
              />
              <div className="invalid-feedback">Password is required.</div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder={email}
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                defaultValue={birthday}
                onChange={(e) => setBirthday(e.target.value.slice(0, 10))}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" type="button" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Update User
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* </Form> */}

      <Modal show={deleteShow} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title className="ms-auto">Deregister</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Would you like to delete your account?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteAccount}>
            Delete account
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfileView;

// Issue
// Keep getting infinite re-renders when trying to set allUsers state
