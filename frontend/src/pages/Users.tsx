import React from 'react';
import { useParams } from 'react-router-dom';
import PaginationByUsers from '../components/PaginationByUsers';
import TableUsers from '../components/TableUsers';
import '../styles/users.css';

function Users() {
  const params = useParams();

  return (
    <div className="users">
      <h1>Usuários Cadastrados</h1>
      <TableUsers />
      <PaginationByUsers active={Number(params.page)} />
    </div>
  );
}

export default Users;
