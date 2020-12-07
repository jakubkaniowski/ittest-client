import React, { useContext } from 'react';
import styled from 'styled-components';
import TestContext from '../../../context/TestContext';
import Heading from '../../atoms/Heading/Heading';
import Card from '../../molecules/Card/Card';

const StyledCard = styled(Card)`
  margin: 10px 0;
  border: 1px solid black;
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

const StyledAnswer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  appearance: none;
  border: 1px solid black;
  border-radius: 0;
  padding: 10px;
  position: relative;
  margin-left: 10px;
  margin-right: 10px;

  &:checked::after {
    content: 'X';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const StyledLabel = styled.label`
  flex: 1;
`;

const StyledImage = styled.img`
  margin: 0 auto;
  max-width: 100%;
  height: auto;
`;

const Question = () => {
  const { currentStepData, handleAnswer, getCurrentAnswer } = useContext(TestContext);
  const currentAnswer = getCurrentAnswer();
  return (
    <StyledCard>
      <Heading>{currentStepData.title}</Heading>
      {currentStepData.image && <StyledImage src={currentStepData.image} alt="question" />}
      <StyledGrid>
        {currentStepData.answers.map((answer) => {
          const { shortcut, description } = answer;
          return (
            <StyledAnswer key={shortcut}>
              {shortcut}
              .
              {' '}
              <StyledInput
                id={`answer_${shortcut}`}
                key={shortcut}
                type="radio"
                name={`answerTo_${currentStepData.id}`}
                checked={currentAnswer ? currentAnswer.answer === shortcut : false}
                value={shortcut}
                onChange={() => handleAnswer({ id: currentStepData.id, answer: shortcut })}
              />
              {' '}
              <StyledLabel htmlFor={`answer_${shortcut}`}>{description}</StyledLabel>
            </StyledAnswer>
          );
        })}
      </StyledGrid>
    </StyledCard>
  );
};

export default Question;
