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
};

export default TestReducer;

export { initialState };
