import React, { useEffect, useContext } from 'react';
import { fetchUsers } from '../services/getFetch';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';

function TableUsers() {
  const { allUsers, setAllUsers } = useContext(UserContext);
  const params = useParams();
  const paramsLessOne = Number(params.page) - 1;

  const getAllUsers = async () => {
    const response = await fetchUsers(paramsLessOne);
    const data = await response.json();
    setAllUsers(data.find);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
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
  );
}

export default TableUsers;
