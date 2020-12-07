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
  background-color: ${({ stepStatus }) => (stepStatus === false ? '#fff' : 'green')};
  color: ${({ stepStatus }) => (stepStatus === false ? '#000' : '#fff')};
  border: 1px solid #000;
  padding: 6px;

  @media (max-width: 768px) {
    grid-row: 1;
  }
`;

const Progress = () => {
  const { data, answers, handleStep } = useContext(TestContext);
  return (
    <StyledWrapper>
      {data.map((step, index) => {
        const { id } = step;
        const isAnswered = checkIfExists({ array: answers, item: step });
        return (
          <StyledButton stepStatus={isAnswered} key={id} onClick={() => handleStep({ stepId: id })}>
            {index + 1}
          </StyledButton>
        );
      })}
    </StyledWrapper>
  );
};

export default Progress;
