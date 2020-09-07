import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../utils/Loading';

const LoadingContext = createContext();

export const useLoadingContenxt = () => useContext(LoadingContext);

const LoadingContextWrapper = ({ children }) => {
  const [toggle, handleToggle] = useState(false);

  const handleToggleChange = () => {
    handleToggle(!toggle);
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
