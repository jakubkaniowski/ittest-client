import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import PortalCreator from './PortalCreator';

const loadingElement = document.getElementById('loading');

const StyledWrapper = styled.span`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Loading = ({ toggle = false }) => (
  <PortalCreator portalElement={loadingElement}>
    {toggle && (
      <StyledWrapper>
        <FontAwesomeIcon icon={faCircleNotch} spin size="3x" />
      </StyledWrapper>
    )}
  </PortalCreator>
);

Loading.propTypes = {
  toggle: PropTypes.bool,
};

Loading.defaultProps = {
  toggle: false,
};

export default Loading;
