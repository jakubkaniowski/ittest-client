import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../../../components/atoms/Input/Input';
import Button from '../../../components/atoms/Button/Button';
import { AUTH_TOKEN_NAME, AUTH_TOKEN_PLACEHOLDER, AUTH_TYPES } from '../../../utils/const';

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Login = ({ setCurrentView }) => {
  const [input, setInputValue] = useReducer((value, newValue) => ({ ...value, ...newValue }), {
    login: '',
    password: '',
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ [name]: value });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (input.login && input.password) {
      window.localStorage.setItem(AUTH_TOKEN_NAME, AUTH_TOKEN_PLACEHOLDER);
      window.location.replace('/student');
    }
  };

  return (
    <form onSubmit={onSubmitForm} method="POST">
      <Input
        block
        name="login"
        type="text"
        label="Email"
        value={input.login}
        onChange={onChange}
        required
      />
      <Input
        block
        name="password"
        type="password"
        label="Hasło"
        value={input.password}
        onChange={onChange}
        required
      />
      <StyledRow>
        <Button block type="submit">
          Zaloguj
        </Button>
        <Button
          block
          color="secondary"
          onClick={() => setCurrentView({ view: AUTH_TYPES.register })}
        >
          Rejestracja
        </Button>
      </StyledRow>
    </form>
  );
};

Login.propTypes = {
  setCurrentView: PropTypes.func,
};

Login.defaultProps = {
  setCurrentView: () => {},
};

export default Login;
