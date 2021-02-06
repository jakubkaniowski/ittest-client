import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faFile,
  faGraduationCap,
  faHome,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { darken } from 'polished';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../../theme/logo.png';
import Button from '../../atoms/Button/Button';
import { collapseElement, expandSection } from '../../../utils/size-utils';
import { useLoadingContext } from '../../../context/LoadingContext';
import AuthServices from '../../../services/AuthServices';
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

const StyledMenuItem = styled(Link)`
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
    display: flex;
    justify-content: space-between;
  }

  & > svg {
    display: none;

    @media (max-width: 768px) {
      display: inline-block;
    }
  }

  &:last-of-type {
    & > svg {
      display: inline-block;
    }

    & > span {
      display: none;

      @media (max-width: 768px) {
        display: inline-block;
      }
    }
  }
`;

const StyledMenuItemLabel = styled.span``;

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const styledMenuRef = useRef(null);
  const history = useHistory();
  const loading = useLoadingContext();

  const handleSetExpanded = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const logout = async () => {
    try {
      loading({ isLoading: true });
      const response = await AuthServices.logout();

      const { status, data } = response;

      const { message } = data;

      if (!status || status !== 200) {
        throw new Error(message);
      }

      localStorage.removeItem(AUTH_TOKEN_NAME);
      history.push('/');
    } catch (error) {
      console.log({ error });
      console.error(error);
    } finally {
      loading({ isLoading: false });
    }
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
        <StyledMenuItem to="/student">
          <StyledMenuItemLabel>Dashboard</StyledMenuItemLabel>
          <FontAwesomeIcon icon={faHome} cursor="pointer" />
        </StyledMenuItem>
        <StyledMenuItem to="/student/tests">
          <StyledMenuItemLabel>Testy</StyledMenuItemLabel>
          <FontAwesomeIcon icon={faFile} cursor="pointer" />
        </StyledMenuItem>
        <StyledMenuItem to="/student/learn">
          <StyledMenuItemLabel>Nauka</StyledMenuItemLabel>
          <FontAwesomeIcon icon={faGraduationCap} cursor="pointer" />
        </StyledMenuItem>
        <StyledMenuItem onClick={logout} to="">
          <StyledMenuItemLabel>WYLOGUJ</StyledMenuItemLabel>
          <FontAwesomeIcon icon={faSignOutAlt} cursor="pointer" />
        </StyledMenuItem>
      </StyledMenu>
    </StyledWrapper>
  );
};

export default Navbar;
