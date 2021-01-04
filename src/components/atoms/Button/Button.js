import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

const styles = css`
  background-color: ${({ color, theme }) => (color ? `rgba(${theme.colors[color]})` : `rgba(${theme.colors.primary})`)};
  color: ${({ theme }) => `rgba(${theme.colors.white})`};
  padding: ${({ large }) => (large ? '2.2rem 2.8rem' : '1.6rem 2.2rem')};
  border-radius: ${({ large }) => (large ? '1.6rem' : '0.5rem')};
  border: none;
  margin: 0.7rem 0;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  font-size: 1.6rem;
  cursor: pointer;
  transition: 300ms background-color;

  ${({ disabled }) => disabled
    && `
    opacity: .65;
  `}

  ${({ block }) => block
    && `
    width: 100%;
  `}

  &:hover {
    background-color: ${({ theme, color }) => (color
    ? `${darken(0.05, `rgb(${theme.colors[color]})`)}`
    : `${darken(0.15, `rgb(${theme.colors.primary})`)}`)};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledButton = styled.button.attrs((props) => ({
  type: props.type || 'button',
  className: [...props.additionalClass].join(' ') || '',
}))`
  ${styles}
`;

const Button = (props) => {
  const { children } = props;
  return <StyledButton {...props}>{children}</StyledButton>;
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  type: PropTypes.string,
  additionalClass: PropTypes.arrayOf(PropTypes.string),
};

Button.defaultProps = {
  type: 'button',
  additionalClass: ['button'],
};

export default Button;
