import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserContext, { defaultValue } from './UserContext';
import { useLoadingContext } from './LoadingContext';
import { AUTH_STATUS, AUTH_TOKEN_NAME } from '../utils/const';

const UserContextWrapper = ({ children }) => {
  const [user, setUser] = useState(defaultValue.user);
  const loadingContext = useLoadingContext();

  const GetUser = () => {
    const { localStorage } = window;
    if (localStorage.getItem(AUTH_TOKEN_NAME)) {
      return {
        user: {
          id: 1,
          name: 'user',
        },
        status: AUTH_STATUS.success,
      };
    }
    return {
      status: AUTH_STATUS.fail,
      message: 'no user',
    };
  };

  const getUser = async () => {
    try {
      loadingContext({ isLoading: true });
      const response = await GetUser();
      const { user: currentUser, status, message } = response;
      if (status === AUTH_STATUS.success) {
        setUser(currentUser);
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error(`Status is ${error.message}`);
    } finally {
      loadingContext({ isLoading: false });
    }
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
