import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginView({ onLoggedIn }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();

    const data = {
      userName: userName,
      password: password,
    };

    fetch('https://myflixdbrender.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login request: ', data);
        if (data.user) {
          localStorage.setItem('userName', JSON.stringify(data.user));
          // localStorage.setItem('myFlixClientToken', JSON.stringify(data.token));
          localStorage.setItem('myFlixClientToken', data.token);

          location.reload();
        } else {
          alert('No such user');
        }
      })
      .catch((error) => alert('Something went wrong: ', error));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            minLength="4"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default LoginView;
