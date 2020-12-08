import React, { useState } from 'react';
import styled from 'styled-components';
import Login from './login/Login';
import Register from './register/Register';
import Card from '../../components/molecules/Card/Card';
import AuthTemplate from '../../components/templates/AuthTemplate';
import logo from '../../theme/logo.png';
import { AUTH_TYPES } from '../../utils/const';

const StyledLogo = styled.img`
  margin: 0 auto;
`;

const StyledCard = styled(Card)`
  max-width: 95vw;
  min-width: 40vw;
  border-radius: 0.8em;
`;

const Auth = () => {
  const [currentRoute, setCurrentView] = useState('login');

  const handleSetCurrentView = ({ view }) => {
    setCurrentView(view);
  };

  let Component;
  switch (currentRoute.toLowerCase()) {
    case AUTH_TYPES.login:
      Component = <Login setCurrentView={handleSetCurrentView} currentRoute={currentRoute} />;
      break;
    case AUTH_TYPES.register:
      Component = <Register setCurrentView={handleSetCurrentView} currentRoute={currentRoute} />;
      break;
    default:
      break;
  }

  return (
    <AuthTemplate>
      <StyledCard>
        <StyledLogo src={logo} alt="ItTest logo" width="200" height="200" />
        {Component}
      </StyledCard>
    </AuthTemplate>
  );
};

export default Auth;
