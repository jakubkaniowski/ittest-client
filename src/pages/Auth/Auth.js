import React, { useState } from 'react';
import styled from 'styled-components';
import Login from './login/Login';
import Register from './register/Register';
import Card from '../../components/molecules/Card/Card';
import AuthTemplate from '../../components/templates/AuthTemplate';
import logo from '../../theme/logo.png';
import { AUTH_TYPES } from '../../utils/const';
import animate, { FlipWrapper } from '../../utils/flipAnimation';
import ForgotPassword from './forgot/ForgotPassword';

const StyledLogo = styled.img`
  margin: 0 auto;
`;

const StyledCard = styled(Card)`
  max-width: 95vw;
  min-width: 40vw;
`;

const Auth = () => {
  const [currentRoute, setCurrentView] = useState('login');
  const ref = React.useRef();

  const handleSetCurrentView = ({ view }) => {
    animate({
      delay: 800,
      callback: () => {
        setCurrentView(view);
      },
      passedRef: ref,
    });
  };

  let Component;
  switch (currentRoute.toLowerCase()) {
    case AUTH_TYPES.login:
      Component = <Login setCurrentView={handleSetCurrentView} />;
      break;
    case AUTH_TYPES.register:
      Component = <Register setCurrentView={handleSetCurrentView} />;
      break;
    case AUTH_TYPES.forgot:
      Component = <ForgotPassword setCurrentView={handleSetCurrentView} />;
      break;
    default:
      break;
  }

  return (
    <AuthTemplate>
      <FlipWrapper ref={ref}>
        <StyledCard>
          <StyledLogo src={logo} alt="ItTest logo" width="200" height="200" />
          {Component}
        </StyledCard>
      </FlipWrapper>
    </AuthTemplate>
  );
};

export default Auth;
