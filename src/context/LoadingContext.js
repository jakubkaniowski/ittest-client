import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../utils/Loading';

const LoadingContext = createContext();

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('Loading context not found');
  }
  return context;
};

const LoadingContextWrapper = ({ children }) => {
  const [toggle, handleToggle] = useState(false);

  const handleToggleChange = ({ isLoading = false }) => {
    handleToggle(isLoading);
  };

  return (
    <LoadingContext.Provider value={handleToggleChange}>
      <Loading toggle={toggle} />
      {children}
    </LoadingContext.Provider>
  );
};

LoadingContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoadingContextWrapper;
