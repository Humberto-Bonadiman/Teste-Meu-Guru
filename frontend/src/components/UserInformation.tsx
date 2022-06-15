import { useContext, useState } from 'react';
import { fetchUser } from '../services/getFetch';
import { UserContext } from '../context/userContext';
import { Form, Button } from 'react-bootstrap';
import '../styles/userInformation.css';

function UserInformation() {
  const { setUsers } = useContext(UserContext);
  const [name, setName] = useState('');
  const [active, setActive] = useState(false);

  const handleClick = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const result = await fetchUser(name);
    const GET = 200;
    if (result.status === GET) {
      const body = await result.json();
      setUsers(body.find);
      setActive(true);
    }
  };

  const comeBack = async () => {
    const value = localStorage.getItem('user');
    if (typeof value === 'string') {
      const dataStorage = JSON.parse(value) || [];
      setUsers(dataStorage);
      setActive(false);
    }
  };

  return(
    <Form
      className="card mt-3 pb-3 pt-1 container-sm w-50"
    >
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label data-testid="form-label">Nome</Form.Label>
        <Form.Control
          type="text"
          data-testid="input-name"
          placeholder="João"
          onChange={ ({ target }) => setName(target.value) }
        />
      </Form.Group>
      <Button
        variant="primary"
        data-testid="form-button-verify"
        type="submit"
        className="mt-3 button-form"
        onClick={ handleClick }
      >
        <span>Verificar</span>
      </Button>
      <Button
        variant="primary"
        data-testid="form-button-return"
        type="submit"
        disabled={ !active }
        className="mt-3 button-form"
        onClick={ comeBack }
      >
        <span>Voltar</span>
      </Button>
    </Form>
  );
};

export default UserInformation;
