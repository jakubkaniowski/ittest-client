import React from 'react';
import PropTypes from 'prop-types';

const Heading = ({ children, className }) => <h1 className={className}>{children}</h1>;

Heading.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]).isRequired,
  className: PropTypes.string,
};

Heading.defaultProps = {
  className: '',
};

export default Heading;
