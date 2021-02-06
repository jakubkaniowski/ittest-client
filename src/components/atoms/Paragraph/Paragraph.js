import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledParagraph = styled.p`
  text-align: ${({ align }) => align || 'left'};
  font-weight: ${({ bold }) => (bold && 600) || 300};
  color: ${({ theme }) => `rgba(${theme.colors.black})`};
  font-size: ${({ theme }) => theme.fontSizes.m};
`;

const Paragraph = ({
  children, align, bold, className,
}) => (
  <StyledParagraph align={align} bold={bold} className={className}>
    {children}
  </StyledParagraph>
);

Paragraph.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  align: PropTypes.string,
  bold: PropTypes.bool,
  className: PropTypes.string,
};

Paragraph.defaultProps = {
  align: 'left',
  bold: false,
  className: '',
};

export default Paragraph;
