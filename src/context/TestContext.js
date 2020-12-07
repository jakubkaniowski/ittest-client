import { createContext, useContext } from 'react';

const defaultValue = {
  activeStep: 0,
};

const TestContext = createContext(defaultValue);

const useTestContext = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('Test compound components cannot be rendered outside the Test component');
  }
  return context;
};

export default TestContext;

export { defaultValue, useTestContext };
