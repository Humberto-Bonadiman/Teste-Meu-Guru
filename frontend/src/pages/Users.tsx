import { useParams } from 'react-router-dom';
import PaginationByUsers from '../components/PaginationByUsers';
import TableUsers from '../components/TableUsers';
import ShowUserForm from '../components/ShowUserForm';
import '../styles/users.css';

function Users() {
  const params = useParams();

  return (
    <div className="users">
      <h2 data-testid="title-users">Usuários Cadastrados</h2>
      <ShowUserForm />
      <TableUsers />
      <PaginationByUsers active={Number(params.page)} />
    </div>
  );
}

export default Users;
