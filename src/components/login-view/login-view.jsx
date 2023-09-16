import React from 'react';
import { useState } from 'react';

function LoginView({ onLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();

    const data = {
      acess: username,
      secret: password,
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
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', JSON.stringify(data.token));
          onLoggedIn(data.user, data.token);
        } else {
          alert('No such user');
        }
      })
      .catch((error) => alert('Something went wrong: ', error));
  };

  return (
    <>
      <h1>Login In!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={4}
          />
        </label>
        <label htmlFor="">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default LoginView;
