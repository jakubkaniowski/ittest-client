import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AuthTemplate from '../../../components/templates/AuthTemplate';
import Card from '../../../components/molecules/Card/Card';
import Input from '../../../components/atoms/Input/Input';
import Button from '../../../components/atoms/Button/Button';
import logo from '../../../theme/logo.png';
import { PathCreator } from '../../../routing/routes';

const StyledLogo = styled.img`
  margin: 0 auto;
`;

const pageName = 'login';

const Auth = () => {
  const [input, setInputValue] = useReducer((value, newValue) => ({ ...value, ...newValue }), {
    login: '',
    password: '',
    email: '',
  });
  const history = useHistory();

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

  return (
    <AuthTemplate>
      <Card>
        <StyledLogo src={logo} alt="ItTest logo" width="200" height="200" />
        <form onSubmit={onSubmitForm} method="POST">
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
          <Button link block secondary href={PathCreator({ path: pageName })}>
            Logowanie
          </Button>
        </form>
      </Card>
    </AuthTemplate>
  );
};

export default Auth;
