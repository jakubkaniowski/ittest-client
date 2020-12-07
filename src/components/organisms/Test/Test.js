import React from 'react';
import PropTypes from 'prop-types';
import TestProvider from '../../../context/TestProvider';
import Progress from './Progress';
import Question from './Question';
import Controls from './Controls';

const Test = ({ data }) => (
  <TestProvider data={data}>
    <Progress />
    <Question />
    <Controls />
  </TestProvider>
);

Test.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

Test.defaultProps = {
  data: [],
};

export default Test;
