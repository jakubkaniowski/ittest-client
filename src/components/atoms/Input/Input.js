import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1rem 0;
  height: 45px;
  position: relative;
  overflow: hidden;
`;

const StyledInput = styled.input`
  background-color: ${({ disabled, theme }) => (disabled ? `rgb(${theme.colors.gray})` : `rgb(${theme.colors.white})`)};
  border: none;
  outline: none;
  font-size: 1.6rem;
  padding-top: 20px;
  height: 100%;

  ${({ block }) => block
    && `
      width: 100%;
    `}

  &:focus + label > span, &:valid + label > span {
    transform: translateY(-140%);
    color: ${({ theme }) => `rgb(${theme.colors.primary})`};
    font-size: 14px;
  }

  &:focus + label::after,
  &:valid + label::after {
    transform: translateX(0);
  }
`;

const StyledLabel = styled.label`
  height: 100%;
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  transition: transform 300ms;
  pointer-events: none;
  text-transform: capitalize;
  border-bottom: 1px solid ${({ theme }) => `rgb(${theme.colors.black})`};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -1px;
    height: 100%;
    width: 100%;
    border-bottom: 3px solid ${({ theme }) => `rgb(${theme.colors.primary})`};
    transform: translateX(-100%);
    transition: transform 300ms ease;
  }
`;

const StyledLabelContent = styled.span`
  position: absolute;
  left: 0;
  bottom: 5px;
  transition: all 200ms ease-in;
  font-size: ${({ theme }) => theme.fontSizes.m};
`;

const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.ms};
  color: ${({ theme }) => `rgb(${theme.colors.danger})`};
`;

const Input = ({
  type, label, disabled, value, onChange, name, block, required, validation,
}) => (
  <>
    <StyledWrapper>
      <StyledInput
        block={block}
        type={type}
        name={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
        required={required}
      />
      <StyledLabel block={block} htmlFor={name}>
        <StyledLabelContent>{label}</StyledLabelContent>
      </StyledLabel>
    </StyledWrapper>
    {validation.errors && <ErrorMessage>{validation.errors[name]}</ErrorMessage>}
  </>
);

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  block: PropTypes.bool,
  required: PropTypes.bool,
  validation: PropTypes.shape({
    errors: PropTypes.array,
    message: PropTypes.string,
  }),
};

Input.defaultProps = {
  type: 'text',
  disabled: false,
  block: false,
  required: false,
  validation: {},
};

export default Input;
