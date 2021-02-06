import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledAnswer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  flex-wrap: wrap;
  border: 2px solid #ccc;
  border-radius: 5px;

  ${({
    theme, isCorrect, isActiveTest, isNotCorrect,
  }) => !isActiveTest
    && `border-color: rgb(${
      (isCorrect && theme.colors.primary) || (isNotCorrect && theme.colors.danger)
    })`}
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

const Answer = ({
  questionId,
  shortcut,
  description,
  currentAnswer,
  correctAnswer,
  isActiveTest,
  handleAnswer,
}) => (
  <StyledAnswer
    isCorrect={correctAnswer === shortcut}
    isNotCorrect={correctAnswer !== shortcut && currentAnswer === shortcut}
    isActiveTest={isActiveTest}
  >
    {shortcut.toUpperCase()}
    .
    {' '}
    <StyledInput
      id={`answer_${shortcut}`}
      key={shortcut}
      type="radio"
      name={`answerTo_${questionId}`}
      checked={currentAnswer === shortcut}
      value={shortcut}
      disabled={!isActiveTest}
      onChange={() => handleAnswer({ id: questionId, answer: shortcut })}
    />
    {' '}
    <StyledLabel htmlFor={`answer_${shortcut}`}>{description}</StyledLabel>
  </StyledAnswer>
);

Answer.propTypes = {
  questionId: PropTypes.number.isRequired,
  shortcut: PropTypes.oneOf(['a', 'b', 'c', 'd']).isRequired,
  description: PropTypes.string.isRequired,
  currentAnswer: PropTypes.string,
  correctAnswer: PropTypes.string.isRequired,
  isActiveTest: PropTypes.bool.isRequired,
  handleAnswer: PropTypes.func.isRequired,
};

Answer.defaultProps = {
  currentAnswer: '',
};

export default Answer;
