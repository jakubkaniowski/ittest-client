import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledWrapper = styled.div`
  background-color: ${({ bgColor, theme }) => (bgColor ? `rgba(${theme.colors[bgColor]})` : `rgba(${theme.colors.white})`)};
  border-radius: ${({ rounded }) => (rounded ? '1em' : '0')};
  box-shadow: 0px 0px 20px -5px #000;
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.h1`
  background-color: ${({ theme }) => `rgb(${theme.colors.primary})`};
  color: ${({ theme }) => `rgb(${theme.colors.white})`};
  padding: 2rem 1rem;
  font-size: 20px;

  ${({ rounded }) => rounded
    && css`
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
    `};
`;

const StyledBody = styled.article`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 2rem;
`;

const Card = ({
  children, header, className, bgColor,
}) => (
  <StyledWrapper className={className} bgColor={bgColor}>
    {header && <StyledHeader>{header}</StyledHeader>}
    <StyledBody>{children}</StyledBody>
  </StyledWrapper>
);

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  header: PropTypes.string,
  className: PropTypes.string,
  bgColor: PropTypes.string,
};

Card.defaultProps = {
  header: '',
  className: '',
  bgColor: '',
};

export default Card;
