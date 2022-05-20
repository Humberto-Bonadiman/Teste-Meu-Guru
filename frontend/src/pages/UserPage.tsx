import React, { useEffect, useContext, useState } from 'react';
import { fetchUsers, fetchOneUser } from '../services/getFetch';
import { useParams, useNavigate } from 'react-router-dom';
import PaginationByUsers from '../components/PaginationByUsers';
import { Button, Form } from 'react-bootstrap';
import { UserContext } from '../context/userContext';

function UserPage() {
  const { allUsers, setAllUsers } = useContext(UserContext);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const paramsLessOne = Number(params.page) - 1;

  const getAllUsers = async () => {
    const response = await fetchUsers(paramsLessOne);
    const data = await response.json();
    setAllUsers(data.find);
  };

  const checkUser = async () => {
    const response = await fetchOneUser(userEmail, userName);
    const { find } = await response.json();
    localStorage.setItem('user', JSON.stringify(find));
    navigate(`/editUser/${find.id}`);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <h1>UserPage</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={({ target }) => setUserName(target.value)}
            type="email"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={({ target }) => setUserEmail(target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Button variant="primary" type="button" onClick={checkUser}>
          Submit
        </Button>
      </Form>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map(({ id, name, email }, index) => (
            <tr key={index}>
              <th scope="row">{id}</th>
              <td>{name}</td>
              <td>{email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationByUsers active={Number(params.page)} />
    </div>
  );
}

export default UserPage;
