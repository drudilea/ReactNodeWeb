import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import './authForms.css';

const LoginForm = ({ onSubmit }) => {
  return (
    <Form name="login-form" className="auth-form" onFinish={onSubmit}>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
          {
            type: 'email',
            message: 'Not a valid email format!',
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item className="button-container">
        <Button type="primary" htmlType="submit" className="auth-form-button">
          Log in
        </Button>
        <span className="auth-link">
          Or{' '}
          <Link to="/register">
            <u>register now!</u>
          </Link>
        </span>
      </Form.Item>
    </Form>
  );
};
export default LoginForm;
