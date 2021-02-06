import { darken } from 'polished';
import React, { useContext } from 'react';
import styled from 'styled-components';
import TestContext from '../../../context/TestContext';
import { checkIfExists } from '../../../utils/array-utils';
import Button from '../../atoms/Button/Button';

const StyledWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));

  @media (max-width: 768px) {
    overflow-x: auto;
    grid-auto-flow: column;
    grid-auto-columns: minmax(50px, 1fr);
  }
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme, stepStatus }) => (stepStatus === false ? '#fff' : `rgb(${theme.colors.primary})`)};
  color: ${({ stepStatus }) => (stepStatus === false ? '#000' : '#fff')};
  border: 1px solid
    ${({ theme, stepStatus }) => (stepStatus === false
    ? darken(0.4, `rgb(${theme.colors.gray})`)
    : darken(0.15, `rgb(${theme.colors.primary})`))};
  padding: 6px;

  ${({ theme, current }) => current
    && `
    border-color: rgb(${theme.colors.secondary});
    border-width: 2px;
  `}

  @media (max-width: 768px) {
    grid-row: 1;
  }
`;

const Progress = () => {
  const {
    data, activeStep, answers, handleStep,
  } = useContext(TestContext);
  return (
    <StyledWrapper>
      {data.map((step, index) => {
        const { id } = step;
        const isAnswered = checkIfExists({
          array: answers,
          item: step,
          fieldToCompare: 'question_id',
        });
        return (
          <StyledButton
            stepStatus={isAnswered}
            current={index === activeStep}
            key={id}
            onClick={() => handleStep({ stepId: index })}
          >
            {index + 1}
          </StyledButton>
        );
      })}
    </StyledWrapper>
  );
};

export default Progress;
