import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MainTemplate from './MainTemplate';

const StyledWrapper = styled.main`
  background-color: ${({ theme }) => `rgba(${theme.colors.secondary})`};
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  padding: 20px 0;
  justify-content: center;
`;

const AuthTemplate = ({ children }) => (
  <MainTemplate>
    <StyledWrapper>{children}</StyledWrapper>
  </MainTemplate>
);

AuthTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthTemplate;
