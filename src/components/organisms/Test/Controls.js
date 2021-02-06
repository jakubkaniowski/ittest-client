import React, { useContext } from 'react';
import styled from 'styled-components';
import TestContext from '../../../context/TestContext';
import { COLOR_NAMES } from '../../../utils/const';
import Button from '../../atoms/Button/Button';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const StyledControls = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  @media (max-width: 768px) {
    order: -1;
    justify-content: space-between;
  }
`;

const Controls = () => {
  const {
    cancelTest,
    endTest,
    handleNext,
    handlePrev,
    activeStep,
    stepsCount,
    answers,
    isActiveTest,
  } = useContext(TestContext);

  return (
    <StyledWrapper>
      {isActiveTest && (
        <Button color={COLOR_NAMES.danger} onClick={cancelTest}>
          Anuluj test
        </Button>
      )}
      <StyledControls>
        <Button color={COLOR_NAMES.secondary} onClick={handlePrev} disabled={activeStep === 0}>
          &lt;
        </Button>
        &nbsp;
        <Button
          color={COLOR_NAMES.secondary}
          onClick={handleNext}
          disabled={activeStep === stepsCount - 1}
        >
          &gt;
        </Button>
      </StyledControls>
      {isActiveTest && (
        <Button onClick={endTest} disabled={answers.length !== stepsCount}>
          Zakończ test
        </Button>
      )}
    </StyledWrapper>
  );
};

export default Controls;
