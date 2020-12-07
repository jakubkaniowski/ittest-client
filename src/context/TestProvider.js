import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import TestContext, { defaultValue } from './TestContext';
import { checkIfExists } from '../utils/array-utils';

const StyledWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: auto 1fr auto;
`;

const TestProvider = ({ data, children }) => {
  const [currentStep, setCurrentStep] = useState(defaultValue.activeStep);
  const [state, dispatch] = useReducer(
    (currentState, action) => {
      const { type, payload } = action;
      switch (type) {
        case 'answer': {
          const { value } = payload.data;
          const exists = checkIfExists({ array: currentState.answers, item: value });
          if (exists) {
            const updatedAnswers = currentState.answers.map((item) => {
              const { id } = item;
              return id === value.id ? value : item;
            });
            return {
              ...currentState,
              answers: updatedAnswers,
            };
          }
          return {
            ...currentState,
            answers: [...currentState.answers, value],
          };
        }
        default:
          return currentState;
      }
    },
    { answers: [] },
  );
  const history = useHistory();

  const handleStep = ({ stepId }) => {
    setCurrentStep(stepId);
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const answerCreator = ({ id, answer }) => ({
    id,
    answer,
  });

  const handleAnswer = ({ id, answer }) => {
    const newAnwser = answerCreator({ id, answer });

    dispatch({
      type: 'answer',
      payload: {
        data: {
          key: 'answers',
          value: newAnwser,
        },
      },
    });
  };

  const getCurrentAnswer = () => state.answers.find((answer) => answer.id === data[currentStep].id);

  const cancelTest = () => {
    // TODO

    history.goBack();
  };

  const endTest = () => {
    // TODO
    history.goBack();
  };

  const providerValue = {
    activeStep: currentStep,
    stepsCount: data.length,
    data,
    answers: state.answers,
    currentStepData: data[currentStep],
    handleStep,
    handleNext,
    handlePrev,
    cancelTest,
    endTest,
    handleAnswer,
    getCurrentAnswer,
  };

  return (
    <TestContext.Provider value={providerValue}>
      <StyledWrapper>{providerValue.stepsCount > 0 && children}</StyledWrapper>
    </TestContext.Provider>
  );
};

TestProvider.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
};

TestProvider.defaultProps = {
  data: [],
};

export default TestProvider;
