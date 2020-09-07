import React from 'react';
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
  let Component;

  switch (type.toLowerCase()) {
    case ROUTES_TYPES.register:
      Component = <Register />;
      break;
    case ROUTES_TYPES.login:
      Component = <Login />;
      break;
    default:
      Component = <Login />;
      break;
  }

  return Component;
};

Auth.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]),
};

export default Auth;
