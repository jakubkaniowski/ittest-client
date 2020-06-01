import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ children }) => (
  <button type="button" className={styles.wrapper}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string,
};

Button.defaultProps = {
  children: 'Button',
};

export default Button;
