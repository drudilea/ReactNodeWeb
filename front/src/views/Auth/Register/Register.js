import React from 'react';
import { Layout, Card } from 'antd';
import { useHistory } from 'react-router-dom';

import RegisterForm from '../../../components/Forms/AuthForms/RegisterForm';
import { useAuth } from '../../../services/auth-service';
import '../auth.css';

const Register = () => {
  let history = useHistory();
  const auth = useAuth();
  const onSubmit = (input) => {
    const { name, email, password } = input;
    auth.register(name, email, password, () => {
      history.push('/');
    });
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
