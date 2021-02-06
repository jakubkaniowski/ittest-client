import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Input from '../../../components/atoms/Input/Input';
import Button from '../../../components/atoms/Button/Button';
import { AUTH_TOKEN_NAME, AUTH_TYPES } from '../../../utils/const';
import { useLoadingContext } from '../../../context/LoadingContext';
import AuthServices from '../../../services/AuthServices';

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StyledMessage = styled.div`
  margin-top: 10px;
  padding: 1.6rem 2.2rem;
  text-transform: capitalize;
  border-radius: 0.5rem;
  color: ${({ theme }) => `rgb(${theme.colors.white})`};
  background-color: ${({ status, theme }) => (status !== 200 && status !== 201
    ? `rgb(${theme.colors.danger})`
    : `rgb(${theme.colors.primary})`)};
  font-size: ${({ theme }) => theme.fontSizes.ms};
`;

const Login = ({ setCurrentView }) => {
  const [input, setInputValue] = useReducer((value, newValue) => ({ ...value, ...newValue }), {
    email: '',
    password: '',
  });
  const [validation, setValidation] = useState({});
  const loading = useLoadingContext();
  const history = useHistory();

  const onChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ [name]: value });
  };

  const login = async () => {
    try {
      loading({ isLoading: true });
      const response = await AuthServices.login({ credentials: input });

      const { message, status, user } = response.data;

      if (!status || status !== 200) {
        throw new Error(message);
      }

      window.localStorage.setItem(AUTH_TOKEN_NAME, user.access_token);
      setValidation({ message: `${message}. Przekierowanie nastąpi za chwilę.`, status });
      setTimeout(() => history.push('/student'), 3000);
    } catch (error) {
      console.log({ error });
      const { errors, message, status } = error.response.data;
      const msg = message || 'Login: Unknown error.';
      setValidation({ errors, message, status });
      console.error(msg);
    } finally {
      loading({ isLoading: false });
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <form onSubmit={onSubmitForm} method="POST" noValidate>
      <Input
        block
        name="email"
        type="text"
        label="Email"
        value={input.email}
        onChange={onChange}
        required
        validation={validation}
      />
      <Input
        block
        name="password"
        type="password"
        label="Hasło"
        value={input.password}
        onChange={onChange}
        required
        validation={validation}
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
        <Button block color="secondary" onClick={() => setCurrentView({ view: AUTH_TYPES.forgot })}>
          Odzyskaj hasło
        </Button>
      </StyledRow>
      {validation.message && (
        <StyledMessage status={validation.status}>{validation.message}</StyledMessage>
      )}
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
