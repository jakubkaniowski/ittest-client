import React from 'react';
import PropTypes from 'prop-types';

const Heading = ({ children }) => (
  <header>
    {children}
  </header>
);

Heading.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Heading;
