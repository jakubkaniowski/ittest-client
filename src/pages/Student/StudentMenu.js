import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { darken } from 'polished';

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

  @media (max-width: 768px) {
    margin: 10px 0;
    width: 100%;
  }
`;

const StyledMenuItemText = styled.span`
  margin-left: 5px;
`;

const StudentMenu = () => (
  <>
    <StyledMenuItem href="">
      <FontAwesomeIcon icon={faUser} cursor="pointer" />
      <StyledMenuItemText>Profil</StyledMenuItemText>
    </StyledMenuItem>
  </>
);

export default StudentMenu;
