import React, { useState } from 'react';
import { Layout, Card } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';

import LoginForm from '../../../components/Forms/AuthForms/LoginForm';
import { useAuth } from '../../../services/auth-service';
import '../auth.css';

const Login = () => {
  let history = useHistory();
  let location = useLocation();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  let { from } = location.state || { from: { pathname: '/' } };

  const onSubmit = (input) => {
    setLoading(true);
    const { email, password } = input;
    auth
      .login(email, password, () => {
        history.replace(from);
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <Layout.Content className="auth-container">
      <Card title="Log in">
        <LoginForm onSubmit={onSubmit} loading={loading}></LoginForm>
      </Card>
    </Layout.Content>
  );
};

export default Login;
