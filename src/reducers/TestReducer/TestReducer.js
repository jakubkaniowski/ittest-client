const { TestTypes } = require('../../actions/TestActions/types');
const { checkIfExists } = require('../../utils/array-utils');

const initialState = {
  answers: [],
};

const TestReducer = (currentState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TestTypes.SET_ANSWER: {
      const { value } = payload.data;
      const exists = checkIfExists({
        array: currentState.answers,
        item: value,
        fieldToCompare: 'question_id',
      });
      const parsedValue = {
        question_id: value.id,
        answer: value.answer,
      };
      if (exists) {
        const updatedAnswers = currentState.answers.map((item) => {
          const { question_id: questionId } = item;

          if (parsedValue.question_id !== questionId) {
            return item;
          }

          return { ...item, ...parsedValue };
        });
        return {
          ...currentState,
          answers: updatedAnswers,
        };
      }
      return {
        ...currentState,
        answers: [...currentState.answers, parsedValue],
      };
    }
    default:
      return currentState;
  }
};

export default TestReducer;

export { initialState };
