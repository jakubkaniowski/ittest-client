import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import TestContext from './TestContext';
import { SetAnswer } from '../actions/TestActions/test.actions';
import TestReducer from '../reducers/TestReducer/TestReducer';
import TestServices from '../services/TestServices';
import { useLoadingContext } from './LoadingContext';
import { compare } from '../utils/array-utils';

const StyledWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: auto 1fr auto;
`;

const TestProvider = ({ test, children }) => {
  const { answers } = test;
  const [currentStep, setCurrentStep] = useState(0);
  const [state, dispatch] = useReducer(TestReducer, { answers });
  const history = useHistory();
  const location = useLocation();
  const loadingContext = useLoadingContext();

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
    try {
      const newAnswer = answerCreator({ id, answer });
      TestServices.answer({ id: test.id, answer: newAnswer });
      SetAnswer({ newAnswer })(dispatch);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentAnswer = () => state.answers.find((answer) => {
    const { questions } = test;
    const linkedQuestionId = questions[currentStep].id;
    return answer.question_id === linkedQuestionId;
  });

  const cancelTest = async () => {
    try {
      loadingContext({ isLoading: true });
      await TestServices.removeSingleTest({ id: test.id });
      history.goBack();
    } catch (error) {
      console.error(error);
    } finally {
      loadingContext({ isLoading: false });
    }
  };

  const endTest = async () => {
    try {
      loadingContext({ isLoading: true });
      await TestServices.result({ id: test.id });
      history.push(`${location.pathname}/result`);
    } catch (error) {
      console.error(error);
    } finally {
      loadingContext({ isLoading: false });
    }
  };

  useEffect(() => {
    const { questions } = test;
    const sortedAnswers = test.answers.sort(compare('question_id'));
    const answersIds = sortedAnswers.map((item) => item.question_id);
    const questionsIds = questions.map((item) => item.id);
    const neededIndex = [];
    questionsIds.forEach((question, index) => {
      if (question !== answersIds[index]) {
        neededIndex.push(index);
      }
    });

    const [first] = neededIndex;
    setCurrentStep(first || 0);
  }, []);

  const prepareProviderObject = () => {
    const { questions, status } = test;
    return {
      activeStep: currentStep,
      stepsCount: questions.length,
      data: questions,
      answers: state.answers,
      currentStepData: questions[currentStep],
      isActiveTest: status === 'PENDING',
      handleStep,
      handleNext,
      handlePrev,
      cancelTest,
      endTest,
      handleAnswer,
      getCurrentAnswer,
    };
  };

  const providerValue = prepareProviderObject();

  return (
    <TestContext.Provider value={providerValue}>
      <StyledWrapper>{providerValue.stepsCount > 0 && children}</StyledWrapper>
    </TestContext.Provider>
  );
};

TestProvider.propTypes = {
  children: PropTypes.node.isRequired,
  test: PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.number,
    status: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.object),
    questions: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default TestProvider;
