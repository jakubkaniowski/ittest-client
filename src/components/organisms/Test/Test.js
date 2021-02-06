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
  test: PropTypes.arrayOf(PropTypes.object),
};

Test.defaultProps = {
  test: [],
};

export default Test;
