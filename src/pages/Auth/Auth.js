import React, { useReducer, useState, useEffect } from 'react';
import AuthTemplate from '../../components/templates/AuthTemplate';
import Card from '../../components/molecules/Card/Card';
import Input from '../../components/atoms/Input/Input';
import Button from '../../components/atoms/Button/Button';
import Heading from '../../components/atoms/Heading/Heading';
import styles from './Auth.module.scss';

const Auth = () => {
  const [input, setInputValue] = useReducer((value, newValue) => ({ ...value, ...newValue }), {
    login: '',
    password: '',
    email: '',
  });
  const [registerMode, setRegisterMode] = useState(false);
  const [animate, setAnimate] = useState(false);

  const changeMode = ({ cancel }) => {
    if (cancel) {
      setAnimate(false);
      setRegisterMode(false);
    }
    setAnimate(true);
    setRegisterMode(true);
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ [name]: value });
  };

  useEffect(() => {
    if (animate && registerMode) {
      changeMode({ cancel: true });
    }
  }, [animate, registerMode]);

  return (
    <AuthTemplate>
      <Heading>
        <h1>ITTest</h1>
      </Heading>
      <div className={animate ? styles.animatedWrapper : ''}>
        {!registerMode ? (
          <Card header="Logowanie">
            <Input
              block
              name="login"
              type="text"
              label="Login"
              value={input.login}
              onChange={onChange}
            />
            <Input
              block
              name="password"
              type="password"
              label="Password"
              value={input.password}
              onChange={onChange}
            />
            <Button>Zaloguj</Button>
            <Button secondary onClick={changeMode}>Rejestracja</Button>
          </Card>
        ) : (
          <Card header="Rejestracja">
            <Input
              block
              name="login"
              type="text"
              label="Login"
              value={input.login}
              onChange={onChange}
            />
            <Input
              block
              name="Email"
              type="email"
              label="Email"
              value={input.email}
              onChange={onChange}
            />
            <Input
              block
              name="password"
              type="password"
              label="Password"
              value={input.password}
              onChange={onChange}
            />
            <Button>Zarejestruj</Button>
            <Button secondary onClick={changeMode}>Logowanie</Button>
          </Card>
        )}
      </div>
    </AuthTemplate>
  );
};

export default Auth;
