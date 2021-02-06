import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserContext, { defaultValue } from './UserContext';
import { AUTH_TOKEN_NAME } from '../utils/const';
import AuthServices from '../services/AuthServices';

const getUserDetails = async ({ setter }) => {
  const { localStorage } = window;
  const token = localStorage.getItem(AUTH_TOKEN_NAME);

  if (!token) {
    return null;
  }

  try {
    const response = await AuthServices.user();
    const { user, status, message } = response.data;

    if (status !== 200) {
      throw message;
    }

    setter(user);
  } catch (error) {
    setter(null);
  }

  return '';
};

const UserContextWrapper = ({ children }) => {
  const [user, setUser] = useState(defaultValue.user);

  const getUser = async () => {
    getUserDetails({ setter: setUser });
  };

  useEffect(() => {
    getUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

UserContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextWrapper;
