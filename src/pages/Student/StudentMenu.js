import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFile } from '@fortawesome/free-solid-svg-icons';
import { darken } from 'polished';

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StyledMenuItem = styled.a`
  margin: 0 5px;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => `rgba(${theme.colors.black})`};
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => `rgba(${theme.colors.black})`};
  transition: background-color 300ms;

  &:hover {
    background-color: ${({ theme }) => `${darken(0.05, `rgb(${theme.colors.primary})`)}`};
  }
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
