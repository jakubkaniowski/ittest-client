import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledParagraph = styled.p`
  text-align: ${({ align }) => align || 'left'};
  font-weight: ${({ bold }) => (bold && 600) || 300};
  color: ${({ theme }) => `rgba(${theme.colors.black})`};
  font-size: ${({ theme }) => theme.fontSizes.m};
`;

const Paragraph = ({ children, align, bold }) => (
  <StyledParagraph align={align} bold={bold}>
    {children}
  </StyledParagraph>
);

Paragraph.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  align: PropTypes.string,
  bold: PropTypes.bool,
};

Paragraph.defaultProps = {
  align: 'left',
  bold: false,
};

export default Paragraph;
