import { useContext, useState } from 'react';
import { fetchOneUser } from '../services/getFetch';
import { UserContext } from '../context/userContext';
import { Form, Button, Card } from 'react-bootstrap';
import '../styles/userInformation.css';

function UserInformation() {
  const { setAllUsers } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [active, setActive] = useState(false);
  const MIN_LENGTH = 8;

  const isEmailValid = (userEmail: string) => {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexEmail.test(userEmail);
  };

  const handleClick = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const result = await fetchOneUser(email, name);
    const POST = 200;
    const ERROR = 404;
    console.log(result);
    if (result.status === ERROR) {
      setError(true);
      setTimeout(() => { setError(false) }, 5000);
    }
    if (result.status === POST) {
      const body = await result.json();
      console.log(body);
      const { id, email, name, password } = body.find;
      setAllUsers([{ id, email, name, password }]);
      setActive(true);
    }
  };

  const comeBack = async () => {
    const value = localStorage.getItem('user');
    if (typeof value === 'string') {
      const dataStorage = JSON.parse(value) || [];
      setAllUsers(dataStorage);
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
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="joao_augusto@email.com.br"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="João Augusto da Silva"
            onChange={ ({ target }) => setName(target.value) }
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={ !(isEmailValid(email) && name.length >= MIN_LENGTH) }
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
