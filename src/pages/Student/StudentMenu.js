import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFile } from '@fortawesome/free-solid-svg-icons';

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledMenuItem = styled.a`
  margin: 0 10px;
  text-transform: uppercase;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => `rgba(${theme.colors.black})`};
`;

const StyledMenuItemText = styled.span`
  margin-left: 5px;
`;

const StudentMenu = () => (
  <StyledMenu>
    <StyledMenuItem href="">
      <FontAwesomeIcon icon={faUser} cursor="pointer" />
      <StyledMenuItemText>Profil</StyledMenuItemText>
    </StyledMenuItem>
    <StyledMenuItem href="">
      <FontAwesomeIcon icon={faFile} cursor="pointer" />
      <StyledMenuItemText>Zadania</StyledMenuItemText>
    </StyledMenuItem>
  </StyledMenu>
);

export default StudentMenu;
