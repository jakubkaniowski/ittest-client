import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const PortalCreator = ({ children, portalElement }) => {
  const el = document.createElement('div');

  useEffect(() => {
    portalElement.appendChild(el);
    return () => portalElement.removeChild(el);
  }, [el, portalElement]);

  return createPortal(children, el);
};

PortalCreator.propTypes = {
  children: PropTypes.node,
};

export default PortalCreator;
