import React from 'react';
import PropTypes from 'prop-types';

const Heading = ({ children }) => <h1>{children}</h1>;

Heading.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default Heading;
