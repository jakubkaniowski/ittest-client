import React from 'react';
import PropTypes from 'prop-types';

const Heading = ({ children }) => <header>{children}</header>;

Heading.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default Heading;
