import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../../components/atoms/Button/Button';
import Input from '../../../components/atoms/Input/Input';
import { useLoadingContext } from '../../../context/LoadingContext';
import AuthServices from '../../../services/AuthServices';
import { AUTH_TYPES } from '../../../utils/const';

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
  background-color: ${({ status, theme }) => (status !== 'success' ? `rgb(${theme.colors.danger})` : `rgb(${theme.colors.primary})`)};
  font-size: ${({ theme }) => theme.fontSizes.ms};
`;

const ForgotPassword = ({ setCurrentView }) => {
  const [email, setEmail] = useState('');
  const [validation, setValidation] = useState({});
  const loading = useLoadingContext();

  const handleSetEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const onPasswordReset = async (e) => {
    e.preventDefault();
    try {
      loading({ isLoading: true });
      const response = await AuthServices.forgot({ email });

      const { message, status } = response.data;

      if (!status || status !== 'success') {
        throw new Error(message);
      }

      setValidation({ message: `${message}. Przekierowanie nastąpi za chwilę.`, status });
    } catch (error) {
      const { data } = error.response;
      const errors = data.errors || {};
      const message = data.message || error.message || 'Login: Unknown error.';
      setValidation({ errors, message, status: 'fail' });
    } finally {
      loading({ isLoading: false });
    }
  };

  return (
    <form onSubmit={onPasswordReset} method="POST" noValidate>
      <Input
        block
        name="email"
        type="text"
        label="Email"
        value={email}
        onChange={handleSetEmail}
        required
        validation={validation}
      />
      <StyledRow>
        <Button block type="submit">
          Odzyskaj hasło
        </Button>
        <Button block color="secondary" onClick={() => setCurrentView({ view: AUTH_TYPES.login })}>
          Powrót
        </Button>
      </StyledRow>
      {validation.message && (
        <StyledMessage status={validation.status}>{validation.message}</StyledMessage>
      )}
    </form>
  );
};

ForgotPassword.propTypes = {
  setCurrentView: PropTypes.func.isRequired,
};

export default ForgotPassword;
