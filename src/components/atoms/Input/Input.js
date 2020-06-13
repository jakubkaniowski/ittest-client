import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1rem 0;
`;

const StyledInput = styled.input.attrs((props) => ({
  type: props.type || 'text',
}))`
  background-color: ${({ disabled, theme }) => (disabled ? `rgb(${theme.colors.gray})` : `rgb(${theme.colors.white})`)};
  border: 1px solid ${({ theme }) => `rgb(${theme.colors.black})`};
  font-size: 1.6rem;
  padding: 0.4rem;
  margin-top: 0.5rem;
  border-radius: 0.8rem;

  ${({ block }) => block
    && `
      width: 100%;
    `}
`;

const StyledTextArea = styled.textarea.attrs((props) => ({
  rows: props.rows || 5,
  cols: props.cols || 20,
}))`
  background-color: ${({ disabled, theme }) => (disabled ? `rgb(${theme.colors.gray})` : `rgb(${theme.colors.white})`)};
  border: 1px solid ${({ theme }) => `rgb(${theme.colors.black})`};
  border-radius: 0.8rem;
  font-size: 1.6rem;
  padding: 0.3rem;
  margin-top: 0.5rem;
  resize: none;

  ${({ block }) => block
    && `
        width: 100%;
      `}
`;

const StyledLabel = styled.label`
  text-transform: capitalize;
`;

const Input = ({
  type, label, disabled, value, onChange, name,
}) => (
  <StyledWrapper>
    <StyledLabel htmlFor={name}>{label}</StyledLabel>
    {type === 'textarea' ? (
      <StyledTextArea name={name} disabled={disabled} value={value} onChange={onChange} />
    ) : (
      <StyledInput name={name} disabled={disabled} value={value} onChange={onChange} />
    )}
  </StyledWrapper>
);

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

Input.defaultProps = {
  type: 'text',
  disabled: false,
};

export default Input;
