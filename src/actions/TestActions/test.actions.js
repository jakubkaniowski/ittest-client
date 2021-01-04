import { TestTypes } from './types';

export const SetAnswer = ({ newAnswer }) => (dispatch) => {
  dispatch({
    type: TestTypes.SET_ANSWER,
    payload: {
      data: {
        key: 'answers',
        value: newAnswer,
      },
    },
  });
};
