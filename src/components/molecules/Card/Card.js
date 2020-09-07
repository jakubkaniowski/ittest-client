import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  background-color: ${({ theme }) => `rgb(${theme.colors.white})`};
  border-radius: ${({ rounded }) => (rounded ? '1em' : '0')};
  box-shadow: 0px 0px 20px -5px #000;
  min-width: 250px;
  width: 40vw;
`;

const StyledHeader = styled.h1`
  background-color: ${({ theme }) => `rgb(${theme.colors.tertiaryDarken})`};
  color: ${({ theme }) => `rgb(${theme.colors.white})`};
  padding: 2rem 1rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  font-size: 20px;
`;

const StyledBody = styled.article`
  display: flex;
  min-width: 175px;
  flex-direction: column;
  padding: 2rem;
`;

const Card = ({ children, header }) => (
  <StyledWrapper>
    {header && <StyledHeader>{header}</StyledHeader>}
    <StyledBody>{children}</StyledBody>
  </StyledWrapper>
);

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  header: PropTypes.string,
};

Card.defaultProps = {
  header: '',
};

export default Card;
