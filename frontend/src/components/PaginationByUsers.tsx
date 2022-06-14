import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { fetchAllUsers } from '../services/getFetch';
import { Pagination } from 'react-bootstrap';

interface IActive {
  active?: number;
}

function PaginationByUsers({ active }: IActive) {
  const [users, setUsers] = useState([]);

  const getPageUsers = async () => {
    const response = await fetchAllUsers();
    const data = await response.json();
    setUsers(data.findAll);
  };

  const numberUsers = Math.ceil(users.length / 10);

  useEffect(() => {
    getPageUsers();
  }, []);

  let items = [];
  for (let number = 1; number <= numberUsers; number++) {
    items.push(
      <Pagination.Item href={`/users/${number}`} key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  const paginationBasic = (
    <div>
      <Pagination size="sm">{items}</Pagination>
    </div>
  );

  return paginationBasic;
}

PaginationByUsers.propTypes = {
  active: PropTypes.number
}

export default PaginationByUsers;
