import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Input from '../../../components/atoms/Input/Input';
import Button from '../../../components/atoms/Button/Button';

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Register = ({ setCurrentRoute, accountType }) => {
  const [input, setInputValue] = useReducer((value, newValue) => ({ ...value, ...newValue }), {
    login: '',
    password: '',
    email: '',
  });
  const history = useHistory();

  const onChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ [name]: value });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (input.login && input.password) {
      history.push(`/${accountType}`);
    }
  };

  return (
    <form onSubmit={onSubmitForm} method="POST" noValidate>
      <Input
        block
        name="login"
        type="text"
        label="Login"
        value={input.login}
        onChange={onChange}
        required
      />
      <Input block name="email" type="text" label="Email" value={input.email} onChange={onChange} />
      <Input
        block
        name="password"
        type="password"
        label="Password"
        value={input.password}
        onChange={onChange}
      />
      <StyledRow>
        <Button block type="submit">
          Zarejestruj
        </Button>
        <Button block color="secondary" onClick={() => setCurrentRoute('login')}>
          Logowanie
        </Button>
      </StyledRow>
    </form>
  );
};

Register.propTypes = {
  setCurrentRoute: PropTypes.func,
  accountType: PropTypes.oneOf(['register', 'login']),
};

Register.defaultProps = {
  setCurrentRoute: () => {},
  accountType: 'login',
};

export default Register;
