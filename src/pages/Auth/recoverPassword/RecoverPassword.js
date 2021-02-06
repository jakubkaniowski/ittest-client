import React, { useReducer } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
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
  const loading = useLoadingContext();
  const location = useLocation();
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

      console.log(response);
    } catch (error) {
      console.error(error);
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
            required
          />
          <Input
            block
            name="password_confirmation"
            type="password"
            label="Powtórz hasło"
            value={input.password_confirmation}
            onChange={onChange}
            required
          />
          <StyledRow>
            <Button block type="submit">
              Zmień hasło
            </Button>
          </StyledRow>
        </form>
      </StyledCard>
    </AuthTemplate>
  );
};

export default RecoverPassword;
