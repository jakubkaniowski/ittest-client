import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AuthTemplate from '../../../components/templates/AuthTemplate';
import Card from '../../../components/molecules/Card/Card';
import Input from '../../../components/atoms/Input/Input';
import Button from '../../../components/atoms/Button/Button';
import logo from '../../../theme/logo.png';

const StyledLogo = styled.img`
  margin: 0 auto;
`;

const Login = ({ setCurrentRoute, accountType }) => {
  const [input, setInputValue] = useReducer((value, newValue) => ({ ...value, ...newValue }), {
    login: '',
    password: '',
  });

  const history = useHistory();

  const onChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ [name]: value });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (input.login && input.password) {
      history.push(`/${accountType}`);
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
            name="password"
            type="password"
            label="Password"
            value={input.password}
            onChange={onChange}
          />
          <Button block type="submit">
            Zaloguj
          </Button>
          <Button block secondary onClick={() => setCurrentRoute('register')}>
            Rejestracja
          </Button>
        </form>
      </Card>
    </AuthTemplate>
  );
};

Login.propTypes = {
  setCurrentRoute: PropTypes.func,
  accountType: PropTypes.oneOf(['register', 'login']),
};

Login.defaultProps = {
  setCurrentRoute: () => {},
  accountType: 'login',
};

export default Login;
