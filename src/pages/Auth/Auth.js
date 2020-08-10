import React, { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AuthTemplate from '../../components/templates/AuthTemplate';
import Card from '../../components/molecules/Card/Card';
import Input from '../../components/atoms/Input/Input';
import Button from '../../components/atoms/Button/Button';
import logo from '../../theme/logo.png';

const StyledLogo = styled.img`
  margin: 0 auto;
`;

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
        <>
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
          <Button link block secondary onClick={(e) => changeMode({ mode: 'Register' }, e)}>
            Rejestracja
          </Button>
        </>
      );
      break;
    case 'Register':
      Component = (
        <>
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
          <Button link block secondary onClick={(e) => changeMode({ mode: 'Login' }, e)}>
            Logowanie
          </Button>
        </>
      );
      break;
    default:
      break;
  }

  return (
    <AuthTemplate>
      <Card>
        <StyledLogo src={logo} alt="ItTest logo" width="200" height="200" />
        <form onSubmit={onSubmitForm} method="POST">
          {Component}
        </form>
      </Card>
    </AuthTemplate>
  );
};

export default Auth;
