import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { darken } from 'polished';
import { useHistory } from 'react-router-dom';
import logo from '../../../theme/logo.png';
import Button from '../../atoms/Button/Button';
import { collapseElement, expandSection } from '../../../utils/size-utils';
import { AUTH_TOKEN_NAME } from '../../../utils/const';

const StyledWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 5px 30px;
  transition: height ease 1s;
  background-color: ${({ theme }) => `rgb(${theme.colors.primary})`};
  transition: 300ms background-color;
`;

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 768px) {
    display: none;
    flex-basis: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: auto;
    transition: height ease-out 300ms;
    overflow: hidden;
    position: relative;
  }
`;

const MenuToggler = styled(Button)`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: auto;
  }
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

  @media (max-width: 768px) {
    margin: 10px 0;
    width: 100%;
  }
`;

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const styledMenuRef = useRef(null);
  const history = useHistory();

  const handleSetExpanded = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_NAME);
    history.push('/');
  };

  useLayoutEffect(() => {
    if (expanded) {
      expandSection({ element: styledMenuRef.current });
    } else {
      collapseElement({ element: styledMenuRef.current });
    }
  }, [expanded]);

  return (
    <StyledWrapper>
      <img src={logo} alt="ItTest logo" width="50" height="50" />
      <MenuToggler onClick={handleSetExpanded}>
        <FontAwesomeIcon icon={faBars} cursor="pointer" />
      </MenuToggler>
      <StyledMenu expanded={expanded} ref={styledMenuRef}>
        <StyledMenu />
        <StyledMenuItem href="" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} cursor="pointer" />
        </StyledMenuItem>
      </StyledMenu>
    </StyledWrapper>
  );
};

export default Navbar;
