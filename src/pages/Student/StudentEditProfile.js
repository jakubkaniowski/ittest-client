import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/atoms/Button/Button';
import Heading from '../../components/atoms/Heading/Heading';
import Input from '../../components/atoms/Input/Input';
import Card from '../../components/molecules/Card/Card';
import DashboardTemplate from '../../components/templates/DashboardTemplate';
import { useLoadingContext } from '../../context/LoadingContext';
import AuthServices from '../../services/AuthServices';

const StyledCard = styled(Card)`
  max-width: 95vw;
  min-width: 50vw;
  align-self: center;
  margin: 0 auto;
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

const StyledHeading = styled(Heading)`
  align-self: center;
  display: flex;
  padding: 1em 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const StyledWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StudentEditProfile = () => {
  const [input, setInputValue] = useReducer((value, newValue) => ({ ...value, ...newValue }), {
    name: '',
    email: '',
  });
  const [validation, setValidation] = useState({});
  const loading = useLoadingContext();

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ [name]: value });
  };

  const onProfileEdit = async (e) => {
    e.preventDefault();
    try {
      loading({ isLoading: true });
      const response = await AuthServices.editProfile({ details: input });

      const { message } = response.data;

      setValidation({ message: `${message}.`, status: 'success' });
    } catch (error) {
      const { data } = error.response;
      const errors = data.errors || {};
      const message = data.message || error.message || 'Edit Profile: Unknown error.';
      setValidation({ errors, message, status: 'fail' });
    } finally {
      loading({ isLoading: false });
    }
  };

  const getUserDetails = async () => {
    try {
      loading({ isLoading: true });
      const response = await AuthServices.user();

      const { name, email } = response.data.user;

      setInputValue({ name, email });
    } catch (error) {
      console.error(error);
    } finally {
      loading({ isLoading: false });
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <DashboardTemplate>
      <StyledWrapper>
        <StyledHeading>Mój profil</StyledHeading>
        <StyledCard>
          <p>Tutaj możesz edytować swój profil</p>
          <form onSubmit={onProfileEdit} method="POST" noValidate>
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
              label="Email"
              value={input.email}
              onChange={onChange}
              required
              validation={validation}
            />
            <StyledRow>
              <Button block type="submit">
                Zapisz
              </Button>
            </StyledRow>
            {validation.message && (
              <StyledMessage status={validation.status}>{validation.message}</StyledMessage>
            )}
          </form>
        </StyledCard>
      </StyledWrapper>
    </DashboardTemplate>
  );
};

export default StudentEditProfile;
