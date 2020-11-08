import React from 'react';
import { Layout, Card } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

import LoginForm from '../../../components/Forms/AuthForms/LoginForm';
import { useAuth } from '../../../services/auth-service';
import '../auth.css';

const Login = () => {
  let history = useHistory();
  let location = useLocation();
  const auth = useAuth();

  let { from } = location.state || { from: { pathname: '/' } };

  const onSubmit = (input) => {
    const { email, password } = input;
    auth.login(email, password, () => {
      history.replace(from);
    });
  };

  return (
    <Layout.Content className="auth-container">
      <Card title="Log in">
        <LoginForm onSubmit={onSubmit}></LoginForm>
      </Card>
    </Layout.Content>
  );
};

export default Login;
