import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Login from './login/Login';
import Register from './register/Register';

const ROUTES_TYPES = {
  login: 'login',
  register: 'register',
};

const Auth = ({ match }) => {
  const { params } = match;
  const type = params.type || '';
  const [currentRoute, setCurrentRoute] = useState('login');
  let component;
  switch (currentRoute.toLowerCase()) {
    case ROUTES_TYPES.login:
      component = (
        <Login setCurrentRoute={setCurrentRoute} currentRoute={currentRoute} accountType={type} />
      );
      break;
    case ROUTES_TYPES.register:
      component = (
        <Register
          setCurrentRoute={setCurrentRoute}
          currentRoute={currentRoute}
          accountType={type}
        />
      );
      break;
    default:
      break;
  }

  return component;
};

Auth.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]),
};

export default Auth;
