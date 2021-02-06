import React, { useContext } from 'react';
import styled from 'styled-components';
import TestContext from '../../../context/TestContext';
import Heading from '../../atoms/Heading/Heading';
import Card from '../../molecules/Card/Card';
import Answer from './Answer';

const StyledCard = styled(Card)`
  margin: 10px 0;
  border: 2px solid ${({ theme }) => `rgb(${theme.colors.primary})`};
  box-shadow: none;
  border-radius: 6px;
`;

const StyledGrid = styled.div`
  display: grid;
  margin-top: 20px;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  align-items: center;
`;

const Question = () => {
  const {
    currentStepData, handleAnswer, getCurrentAnswer, isActiveTest,
  } = useContext(TestContext);
  const currentAnswer = getCurrentAnswer();
  const answerOptions = currentStepData.options;
  return (
    <StyledCard>
      <Heading>{currentStepData.question}</Heading>
      <StyledGrid>
        {Object.entries(answerOptions).map(([key, value]) => (
          <Answer
            key={key}
            shortcut={key}
            description={value}
            handleAnswer={handleAnswer}
            questionId={currentStepData.id}
            currentAnswer={currentAnswer && currentAnswer.answer}
            correctAnswer={currentStepData.correct}
            isActiveTest={isActiveTest}
          />
        ))}
      </StyledGrid>
    </StyledCard>
  );
};

export default Question;
