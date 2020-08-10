import React, { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthTemplate from '../../components/templates/AuthTemplate';
import Card from '../../components/molecules/Card/Card';
import Input from '../../components/atoms/Input/Input';
import Button from '../../components/atoms/Button/Button';
import Heading from '../../components/atoms/Heading/Heading';

const Auth = () => {
  const [input, setInputValue] = useReducer((value, newValue) => ({ ...value, ...newValue }), {
    login: '',
    password: '',
    email: '',
  });
  const [currentMode, setCurrentMode] = useState('Login');
  const history = useHistory();
  let Component;

  const changeMode = ({ mode = 'Login' }, e) => {
    e.preventDefault();
    setCurrentMode(mode);
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ [name]: value });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (input.login && input.password) {
      history.push('/app/teacher');
    }
  };

  switch (currentMode) {
    case 'Login':
      Component = (
        <Card header="Logowanie">
          <Input
            block
            name="login"
            type="text"
            label="Login"
            value={input.login}
            onChange={onChange}
          />
          <Input
            block
            name="password"
            type="password"
            label="Password"
            value={input.password}
            onChange={onChange}
          />
          <Button block type="submit">
            Zaloguj
          </Button>
          <Button secondary type="button" onClick={(e) => changeMode({ mode: 'Register' }, e)}>
            Rejestracja
          </Button>
        </Card>
      );
      break;
    case 'Register':
      Component = (
        <Card header="Rejestracja">
          <Input
            block
            name="login"
            type="text"
            label="Login"
            value={input.login}
            onChange={onChange}
          />
          <Input
            block
            name="Email"
            type="email"
            label="Email"
            value={input.email}
            onChange={onChange}
          />
          <Input
            block
            name="password"
            type="password"
            label="Password"
            value={input.password}
            onChange={onChange}
          />
          <Button block type="submit">
            Zarejestruj
          </Button>
          <Button secondary type="button" onClick={(e) => changeMode({ mode: 'Login' }, e)}>
            Logowanie
          </Button>
        </Card>
      );
      break;
    default:
      break;
  }

  return (
    <AuthTemplate>
      <Heading>
        <h1>ITTest</h1>
      </Heading>
      <form onSubmit={onSubmitForm} method="POST">
        {Component}
      </form>
    </AuthTemplate>
  );
};

export default Auth;
