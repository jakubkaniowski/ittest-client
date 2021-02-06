import React from 'react';
import PropTypes from 'prop-types';
import TestProvider from '../../../context/TestProvider';
import Progress from './Progress';
import Question from './Question';
import Controls from './Controls';

const Test = ({ test }) => (
  <TestProvider test={test}>
    <Progress />
    <Question />
    <Controls />
  </TestProvider>
);

Test.propTypes = {
  test: PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.number,
    status: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.object),
    questions: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default Test;
