import React from 'react';
import styled from 'styled-components';
import logo from '../../../theme/logo.png';
import StudentMenu from '../../../pages/Student/StudentMenu';

const StyledWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px 30px;
  background-color: ${({ theme }) => `rgba(${theme.colors.tertiary})`};
`;

const Navbar = () => (
  <StyledWrapper>
    <img src={logo} alt="ItTest logo" width="50" height="50" />
    <StudentMenu />
  </StyledWrapper>
);

export default Navbar;
