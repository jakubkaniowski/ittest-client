import { createContext, useContext } from 'react';

const defaultValue = {
  user: {},
};

const UserContext = createContext(defaultValue);

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('Test compound components cannot be rendered outside the Test component');
  }
  return context;
};

export default UserContext;

export { useUserContext, defaultValue };
