import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

const styles = css`
  background-color: ${({ secondary, theme }) => (secondary ? `rgba(${theme.colors.tertiaryDarken})` : `rgba(${theme.colors.primary})`)};
  color: ${({ secondary, theme }) => (secondary ? `rgb(${theme.colors.white})` : `rgb(${theme.colors.black})`)};
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

  ${({ block }) => block
    && `
    width: 100%;
    display: block;
  `}

  &:hover {
    background-color: ${({ theme, secondary }) => (secondary
    ? `${darken(0.15, `rgb(${theme.colors.tertiaryDarken})`)}`
    : `${darken(0.15, `rgb(${theme.colors.primary})`)}`)};
  }
`;

const StyledLink = styled.a.attrs((props) => ({
  className: [...props.additionalClass].join(' ') || '',
}))`
  ${styles}
`;

const StyledButton = styled.button.attrs((props) => ({
  type: props.type || 'button',
  className: [...props.additionalClass].join(' ') || '',
}))`
  ${styles}
`;

const Button = (props) => {
  const { children, href, link } = props;
  return !link ? (
    <StyledButton {...props}>{children}</StyledButton>
  ) : (
    <StyledLink href={href} {...props}>
      {children}
    </StyledLink>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  additionalClass: PropTypes.arrayOf(PropTypes.string),
  href: PropTypes.string,
  link: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  additionalClass: ['button'],
  href: '',
  link: false,
};

export default Button;
