import React from 'react';
import { Layout, Button, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

import { useAuth } from '../../services/auth-service';
import './navbar.css';
import logo from '../../assets/images/logo.svg';

const Navbar = () => {
  const auth = useAuth();
  return (
    <Layout.Header>
      <div className="logo-container">
        <img src={logo} className="logo" alt="Company Logo" />
      </div>
      {auth.user && (
        <div className="user-options-container">
          <div className="user-options-avatar">
            {auth.user.img ? (
              <Avatar src={auth.user.img} />
            ) : (
              <Avatar icon={<UserOutlined />} />
            )}
          </div>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={() => auth.logout()}
          >
            Log out
          </Button>
        </div>
      )}
    </Layout.Header>
  );
};

export default Navbar;
