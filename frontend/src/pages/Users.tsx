import { useParams } from 'react-router-dom';
import PaginationByUsers from '../components/PaginationByUsers';
import TableUsers from '../components/TableUsers';
import UserInformation from '../components/UserInformation';
import '../styles/users.css';

function Users() {
  const params = useParams();

  return (
    <div className="users">
      <h2>Usuários Cadastrados</h2>
      <UserInformation />
      <TableUsers />
      <PaginationByUsers active={Number(params.page)} />
    </div>
  );
}

export default Users;
