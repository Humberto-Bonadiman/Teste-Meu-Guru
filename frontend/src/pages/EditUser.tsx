import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { updateFetch } from '../services/putFetch';

function EditUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const updateUser = async () => {
    const id = user.id;
    const setUpdate = {
      email,
      name,
      password
    };
    const result = await updateFetch(id, setUpdate);
    const PUT = 200;
    if (result.status === PUT) {
      navigate(`/users/${1}`);
    }
  };

  useEffect(() => {
    user;
  }, []);

  return (
    <div>
      <h1>Editar Usuário</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={user.name}
            type="email"
            onChange={({ target }) => setName(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={user.email}
            type="email"
            onChange={({ target }) => setEmail(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={user.password}
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="button" onClick={updateUser}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default EditUser;
