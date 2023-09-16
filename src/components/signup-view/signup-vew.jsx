import React, { useState } from 'react';

function SignUpView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch('https://myflixdbrender.onrender.com/users', {
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
        alert('Signup Failed');
      }
    });
  };

  return (
    <>
      <h1>Sign up!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          Username:
          <input
            type="text"
            minLength={4}
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="">
          Password:
          <input
            type="text"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="">
          Email:
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="">
          Birthday:
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default SignUpView;
