import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import AuthTemplate from '../../../components/templates/AuthTemplate';
import Button from '../../../components/atoms/Button/Button';
import Input from '../../../components/atoms/Input/Input';
import Card from '../../../components/molecules/Card/Card';
import logo from '../../../theme/logo.png';
import { useLoadingContext } from '../../../context/LoadingContext';
import AuthServices from '../../../services/AuthServices';
import { useQuery } from '../../../utils/url-utils';

const StyledLogo = styled.img`
  margin: 0 auto;
`;

const StyledCard = styled(Card)`
  max-width: 95vw;
  min-width: 40vw;
`;

const StyledMessage = styled.div`
  margin-top: 10px;
  padding: 1.6rem 2.2rem;
  text-transform: capitalize;
  border-radius: 0.5rem;
  color: ${({ theme }) => `rgb(${theme.colors.white})`};
  background-color: ${({ status, theme }) => (status !== 200 ? `rgb(${theme.colors.danger})` : `rgb(${theme.colors.primary})`)};
  font-size: ${({ theme }) => theme.fontSizes.ms};
`;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const RecoverPassword = () => {
  const [input, setInputValue] = useReducer((value, newValue) => ({ ...value, ...newValue }), {
    password: '',
    password_confirmation: '',
  });
  const [validation, setValidation] = useState({});
  const loading = useLoadingContext();
  const location = useLocation();
  const history = useHistory();
  const params = useQuery({ params: location.search });

  const onChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ [name]: value });
  };

  const onPasswordReset = async (e) => {
    e.preventDefault();
    const queryParameters = {
      token: params.get('token'),
      email: params.get('email'),
    };

    try {
      loading({ isLoading: true });
      const response = await AuthServices.recoverPassword({
        details: { ...input, ...queryParameters },
      });

      const { message, status } = response.data;

      if (!status || status !== 200) {
        throw new Error(message);
      }

      setValidation({ message: `${message}. Przekierowanie nastąpi za chwilę.`, status });
      setTimeout(() => history.push('/'), 3000);
    } catch (error) {
      const { data } = error.response;
      const errors = data.errors || {};
      const message = data.message || error.message || 'Recover Password: Unknown error.';
      setValidation({ errors, message, status: 'fail' });
    } finally {
      loading({ isLoading: false });
    }
  };

  return (
    <AuthTemplate>
      <StyledCard>
        <StyledLogo src={logo} alt="ItTest logo" width="200" height="200" />
        <form onSubmit={onPasswordReset} method="POST" noValidate>
          <Input
            block
            name="password"
            type="password"
            label="Nowe hasło"
            value={input.password}
            onChange={onChange}
            validation={validation}
            required
          />
          <Input
            block
            name="password_confirmation"
            type="password"
            label="Powtórz hasło"
            value={input.password_confirmation}
            onChange={onChange}
            validation={validation}
            required
          />
          <StyledRow>
            <Button block type="submit">
              Zmień hasło
            </Button>
          </StyledRow>
          {validation.message && (
            <StyledMessage status={validation.status}>{validation.message}</StyledMessage>
          )}
        </form>
      </StyledCard>
    </AuthTemplate>
  );
};

export default RecoverPassword;
