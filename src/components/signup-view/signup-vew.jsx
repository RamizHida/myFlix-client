import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SignUpView() {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userBirthDate, setUserBirthdate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      userName: userName,
      password: password,
      userEmail: userEmail,
      userBirthDate: userBirthDate,
    };

    fetch('https://my-flix-66mnayibm-ramizhidas-projects.vercel.app/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        alert('Signup Successful');
        window.location.reload();
      } else {
        alert('User name not available');
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <Form.Group controlId="formUsername">
        <Form.Label>Username: </Form.Label>
        <Form.Control
          type="text"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="4"
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email: </Form.Label>
        <Form.Control
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday: </Form.Label>
        <Form.Control
          type="date"
          value={userBirthDate}
          onChange={(e) => setUserBirthdate(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2 mb-3">
        Submit
      </Button>
    </Form>
  );
}

export default SignUpView;
