import { useContext, useState } from 'react';
import { fetchUser } from '../services/getFetch';
import { UserContext } from '../context/userContext';
import { Form, Button, Card } from 'react-bootstrap';
import '../styles/userInformation.css';

function UserInformation() {
  const { setUsers } = useContext(UserContext);
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [active, setActive] = useState(false);

  const handleClick = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const result = await fetchUser(name);
    const GET = 200;
    const ERROR = 404;
    if (result.status === ERROR) {
      setError(true);
      setTimeout(() => { setError(false) }, 5000);
    }
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

  const ALERT = (
    <div className="alert">
      <Card className="alert" body>Nome e/ou email incorretos</Card>
    </div>
  );

  return(
    <>
      <Form
        className="card mt-3 pb-3 pt-1 container-sm w-50"
      >
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="João"
            onChange={ ({ target }) => setName(target.value) }
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="mt-3 button-form"
          onClick={ handleClick }
        >
          <span>Verificar</span>
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={ !active }
          className="mt-3 button-form"
          onClick={ comeBack }
        >
          <span>Voltar</span>
        </Button>
      </Form>
      { error && ALERT }
    </>
  );
};

export default UserInformation;
