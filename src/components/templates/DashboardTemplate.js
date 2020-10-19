import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MainTemplate from './MainTemplate';
import Navbar from '../organisms/Navbar/Navbar';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  padding-top: 70px;
  background-color: ${({ theme }) => `rgba(${theme.colors.gray})`};
`;

const DashboardTemplate = ({ children }) => (
  <MainTemplate>
    <StyledSection>
      <Navbar />
      {children}
    </StyledSection>
  </MainTemplate>
);

DashboardTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardTemplate;
