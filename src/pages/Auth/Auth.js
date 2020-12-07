import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Login from './login/Login';
import Register from './register/Register';

const ROUTES_TYPES = {
  login: 'login',
  register: 'register',
};

const Auth = () => {
  const [currentRoute, setCurrentRoute] = useState('login');
  let Component;
  switch (currentRoute.toLowerCase()) {
    case ROUTES_TYPES.login:
      Component = <Login setCurrentRoute={setCurrentRoute} currentRoute={currentRoute} />;
      break;
    case ROUTES_TYPES.register:
      Component = <Register setCurrentRoute={setCurrentRoute} currentRoute={currentRoute} />;
      break;
    default:
      break;
  }

  return Component;
};

Auth.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]),
};

export default Auth;
