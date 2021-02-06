import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Input from '../../../components/atoms/Input/Input';
import Button from '../../../components/atoms/Button/Button';
import { AUTH_TYPES } from '../../../utils/const';
import AuthServices from '../../../services/AuthServices';
import { useLoadingContext } from '../../../context/LoadingContext';

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

const Register = ({ setCurrentView }) => {
  const [input, setInputValue] = useReducer((value, newValue) => ({ ...value, ...newValue }), {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [validation, setValidation] = useState({});
  const loading = useLoadingContext();
  const history = useHistory();

  const onChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ [name]: value });
  };

  const register = async () => {
    try {
      loading({ isLoading: true });
      const response = await AuthServices.register({ credentials: input });

      const { message, status } = response;

      if (!status || status !== 201) {
        throw new Error(message);
      }

      setValidation({ message: 'Pomyślna rejestracja. Przekierowanie nastąpi za chwilę.', status });
      setTimeout(() => history.push('/'), 3000);
    } catch (error) {
      const { errors, message } = error.response.data;
      const msg = message || 'Register: Unknown error.';
      setValidation({ errors, message });
      console.error(msg);
    } finally {
      loading({ isLoading: false });
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    register();
  };

  return (
    <form onSubmit={onSubmitForm} method="POST" noValidate>
      <Input
        block
        name="name"
        type="text"
        label="Imię i nazwisko"
        value={input.name}
        onChange={onChange}
        required
        validation={validation}
      />
      <Input
        block
        name="email"
        type="text"
        label="E-mail"
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
      <Input
        block
        name="password_confirmation"
        type="password"
        label="Powtórz Hasło"
        value={input.password_confirmation}
        onChange={onChange}
        required
      />
      <StyledRow>
        <Button block type="submit">
          Zarejestruj
        </Button>
        <Button block color="secondary" onClick={() => setCurrentView({ view: AUTH_TYPES.login })}>
          Logowanie
        </Button>
      </StyledRow>
      {validation.message && (
        <StyledMessage status={validation.status}>{validation.message}</StyledMessage>
      )}
    </form>
  );
};

Register.propTypes = {
  setCurrentView: PropTypes.func,
};

Register.defaultProps = {
  setCurrentView: () => {},
};

export default Register;
