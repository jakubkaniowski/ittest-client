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
  background-color: ${({ theme }) => `rgba(${theme.colors.gray})`};
`;

const StyledContent = styled.div`
  display: flex;
  flex: 1;
  padding: 15px;
`;

const DashboardTemplate = ({ children }) => (
  <MainTemplate>
    <StyledSection>
      <Navbar />
      <StyledContent>{children}</StyledContent>
    </StyledSection>
  </MainTemplate>
);

DashboardTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardTemplate;
