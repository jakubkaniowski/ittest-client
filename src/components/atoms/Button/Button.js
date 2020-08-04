import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken } from 'polished';

const Button = styled.button.attrs((props) => ({
  type: props.type || 'button',
  className: [...props.additionalClass].join(' ') || '',
}))`
  background-color: ${({ secondary, theme }) => (secondary ? `rgba(${theme.colors.tertiaryDarken})` : `rgba(${theme.colors.primary})`)};
  color: ${({ secondary, theme }) => (secondary ? `rgb(${theme.colors.white})` : `rgb(${theme.colors.black})`)};
  padding: ${({ large }) => (large ? '2.2rem 2.8rem' : '1.6rem 2.2rem')};
  border-radius: ${({ large }) => (large ? '2.2rem' : '1.6rem')};
  border: none;
  margin: 0.7rem 0;
  text-transform: uppercase;
  font-size: 1.6rem;
  cursor: pointer;
  transition: 300ms background-color;

  ${({ block }) => block
    && `
      width: 100%;
    `}

  &:hover {
    background-color: ${({ theme, secondary }) => (secondary ? `${darken(0.15, `rgb(${theme.colors.tertiaryDarken})`)}` : `${darken(0.15, `rgb(${theme.colors.primary})`)}`)};
  }
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
