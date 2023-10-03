import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Modal, Form } from 'react-bootstrap';

// function ProfileView() {
//   const token = localStorage.getItem('myFlixClientToken');
//   const [allUsers, setAllUsers] = useState(null);
//   // const [username, setUserName] = useState('');
//   // const [password, setPassword] = useState('');
//   // const [email, setEmail] = useState('');
//   // const [birthday, setBirthday] = useState('');

//   // useEffect(() => {
//   //   fetch('https://myflixdbrender.onrender.com/movies', {
//   //     headers: { Authorization: `Bearer ${token}` },
//   //   })
//   //     .then((res) => {
//   //       // console.log(res);
//   //       res.json();
//   //     })
//   //     .then((userList) => {
//   //       console.log(userList);
//   //       const usersFromAPI = userList.map((user) => {
//   //         return {
//   //           Username: user.userName,
//   //           Password: user.password,
//   //           Email: user.userEmail,
//   //           Birtday: user.userBirthDate,
//   //         };
//   //       });
//   //       setUserInfo(usersFromAPI);
//   //       console.log(userInfo);
//   //     })
//   //     .catch((err) => console.log('Could not get users: ', err));
//   // }, []);

//   useEffect(() => {
//     if (!token) {
//       return;
//     }

//     fetch('https://myflixdbrender.onrender.com/users', {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then((userList) => {
//         const usersFromAPI = userList.map((user) => {
//           console.log(user);
//           return {
//             Username: user.userName,
//             Password: user.password,
//             Email: user.userEmail,
//             Birthday: user.userBirthDate,
//             FavoriteMovies: user.favoriteMovies,
//           };
//         });
//         setAllUsers(usersFromAPI);
//       })
//       .catch((err) => console.log('Something went wrong: ' + err));
//   }, []);

//   let loggedInUser;

//   console.log(allUsers);
//   if (allUsers) {
//     loggedInUser = allUsers.find(
//       (user) =>
//         user.Username === JSON.parse(localStorage.getItem('userName')).userName
//     );
//   }

//   // Find current user via local storage
//   // const loggedInUser = JSON.parse(localStorage.getItem('userName')).userName;

//   // set user
//   // const currentUser = allUsers.filter((user) => user.Username === loggedInUser);

//   return (
//     loggedInUser && (
//       <Row>
//         <Col>
//           <Card className="h-100" style={{ width: '15rem', marginTop: '10px' }}>
//             {/* <Card.Img variant="top" src={user.image} className="movie-image" /> */}
//             <Card.Body>
//               <Card.Title>My Profile</Card.Title>
//               <Card.Text>
//                 Username: {loggedInUser.Username} <br />
//                 Email: {loggedInUser.Username} <br />
//                 Birthday: {loggedInUser.Birthday.slice(0, 10)} <br />
//                 Favorite Movies: <br />
//                 {loggedInUser.FavoriteMovies <= 0
//                   ? 'No Movies Chosen'
//                   : loggedInUser.FavoriteMovies}
//                 <br />
//                 <Button>Edit Profile</Button>
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     )
//   );
// }

// export default ProfileView;

/// New Code Below This Line

import React from 'react';
import { number } from 'prop-types';

function ProfileView({ movies }) {
  const [user, setUser] = useState([]);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  // For Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = localStorage.getItem('myFlixClientToken');

  // console.log(movies, 'movies');

  const getProfileFunction = () => {
    if (!localStorage.getItem('user')) return;

    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user);

    fetch(`https://myflixdbrender.onrender.com/users/${parsedUser._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
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
    }
  }, [user]);

  const updateUser = (event) => {
    event.preventDefault();

    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user);
    console.log(parsedUser.userName);

    const data = {
      userName: userName,
      password: password,
      userEmail: email,
      BirthDate: birthday,
    };
    fetch(`https://myflixdbrender.onrender.com/users/${parsedUser.userName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        let error = updatedUser.errors;
        if (error) {
          console.log(error);
          alert('Invalid Input values. Please try again.');
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
    fetch('https://myflixdbrender.onrender.com/users/' + username, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res.json);
        res.json;
      })
      .then((data) => {
        console.log(data);
        setUser(null);
        localStorage.clear();
        window.location.reload();
      })
      .catch((err) => console.log('Failed to Delete: ' + err));
  };

  // console.log(allUsers);
  // console.log(user);

  return (
    <>
      <Row>
        <Col>
          <Card className="p-20 card-body">
            <Card.Body>
              <Card.Title>Profile Info</Card.Title>
              <Card.Text>
                Username: {userName} <br />
                Email: {email} <br />
                Birthday: {birthday}
                <br />
              </Card.Text>
              <Button
                variant="primary"
                className="m-2"
                onClick={() => {
                  handleShow();
                  console.log('update clicke');
                }}
              >
                Update Profile
              </Button>
              <Button variant="danger" className="m-2">
                Delete Account
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <h3>Favorite Movies</h3>
      </Row>

      <Form onSubmit={updateUser}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="ms-auto">Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <Form onSubmit={updateUser}> */}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="email"
                placeholder={'Must be at least 5 Characters'}
                defaultValue={userName}
                minLength="5"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your new password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
            {/* </Form> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="submit" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={updateUser}>
              Update User
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>

      {/* <Modal>
        <Modal.Header closeButton>
          <Modal.Title className="ms-auto">Deregister</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Would you like to delete your account?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeregister}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteAccount}>
            Delete account
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}

export default ProfileView;

// Issue
// Keep getting infinite re-renders when trying to set allUsers state
