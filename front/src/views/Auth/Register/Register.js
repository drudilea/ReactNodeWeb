import React from 'react';
import { Layout, Card } from 'antd';

import RegisterForm from '../../../components/Forms/AuthForms/RegisterForm';
import AuthService from '../../../services/auth-service';
import '../auth.css';

const Register = () => {
  const onSubmit = (input) => {
    const { name, email, password } = input;

    AuthService.register(name, email, password).then(
      (response) => {
        console.log('REGISTRADO', response);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  };
  return (
    <Layout.Content className="auth-container">
      <Card title="Sign up">
        <RegisterForm onSubmit={onSubmit}></RegisterForm>
      </Card>
    </Layout.Content>
  );
};

export default Register;
