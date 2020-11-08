import React from 'react';
import { Layout, Card } from 'antd';

import LoginForm from '../../../components/Forms/AuthForms/LoginForm';
import AuthService from '../../../services/auth-service';
import '../auth.css';

const Login = () => {
  const onSubmit = (input) => {
    const { email, password } = input;
    AuthService.login(email, password).then(
      () => {
        // props.history.push('/home');
        // window.location.reload();
        console.log('LOGUEADO!');
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.error('NO LOGUEADO', resMessage);

        // setLoading(false);
        // setMessage(resMessage);
      }
    );
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
