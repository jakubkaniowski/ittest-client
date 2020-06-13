import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button.attrs((props) => ({
  type: props.type || 'button',
  className: [...props.additionalClass].join(' ') || '',
}))`
  background-color: ${({ secondary, theme }) => (secondary ? `rgba(${theme.colors.tertiaryDarken})` : `rgba(${theme.colors.primary})`)};
  color: ${({ secondary, theme }) => (secondary ? `rgb(${theme.colors.white})` : `rgb(${theme.colors.black})`)};
  padding: ${({ large }) => (large ? '2.2rem 2.8rem' : '1.6rem 2.2rem')};
  border-radius: ${({ large }) => (large ? '2.2rem' : '1.6rem')};
  border: none;
  text-transform: uppercase;
  font-size: 1.6rem;

  ${({ block }) => block
    && `
      width: 100%;
    `}
`;

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  additionalClass: PropTypes.arrayOf(PropTypes.string),
};

Button.defaultProps = {
  type: 'button',
  additionalClass: ['button'],
};

export default Button;
