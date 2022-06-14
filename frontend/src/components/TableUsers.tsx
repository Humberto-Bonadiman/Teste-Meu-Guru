import { useEffect, useContext } from 'react';
import { fetchUsers } from '../services/getFetch';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import '../styles/tableUsers.css';

function TableUsers() {
  const { users, setUsers } = useContext(UserContext);
  const params = useParams();
  const paramsLessOne = Number(params.page) - 1;

  const getAllUsers = async () => {
    const response = await fetchUsers(paramsLessOne);
    const data = await response.json();
    setUsers(data.find);
    localStorage.setItem('user', JSON.stringify(data.find));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <section className="table-component">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, name, email }, index) => (
            <tr key={index}>
              <th scope="row">{id}</th>
              <td>{name}</td>
              <td>{email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default TableUsers;
