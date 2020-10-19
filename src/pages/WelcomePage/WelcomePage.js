import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import AuthTemplate from '../../components/templates/AuthTemplate';
import Card from '../../components/molecules/Card/Card';
import logo from '../../theme/logo.png';
import { PathCreator } from '../../routing/routes';
import Paragraph from '../../components/atoms/Paragraph/Paragraph';

const StyledLogo = styled.img`
  margin: 15px auto;
`;

const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  align-self: center;
  justify-content: space-around;
  margin-top: 40px;
`;

const StyledAccount = styled.a`
  text-align: center;
  flex: 1 1 0;
  padding: 15px;
  margin: 10px 10px;
  border: 1px solid ${({ theme }) => `rgb(${theme.colors.gray})`};
  text-decoration: none;
  color: ${({ theme }) => `rgb(${theme.colors.white})`};
  background-color: ${({ theme }) => `rgb(${theme.colors.primary})`};
  text-transform: uppercase;
  border-radius: 5px;
  transition: 300ms background-color;

  &:hover {
    background-color: ${({ theme }) => darken(0.15, `rgb(${theme.colors.primary})`)};
  }
`;

const WelcomePage = () => (
  <AuthTemplate>
    <Card>
      <StyledLogo src={logo} alt="ItTest logo" width="200" height="200" />
      <Paragraph align="center">Wybierz swój typ konta</Paragraph>
      <StyledRow>
        <StyledAccount href={PathCreator({ path: 'auth/student' })}>Student</StyledAccount>
        <StyledAccount href={PathCreator({ path: 'auth/teacher' })}>Nauczyciel</StyledAccount>
      </StyledRow>
    </Card>
  </AuthTemplate>
);

export default WelcomePage;
