import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MainTemplate from './MainTemplate';

const StyledWrapper = styled.main`
  background-color: ${({ theme }) => `rgba(${theme.colors.primary})`};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

const AuthTemplate = ({ children }) => (
  <MainTemplate>
    <StyledWrapper>{children}</StyledWrapper>
  </MainTemplate>
);

AuthTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default AuthTemplate;
