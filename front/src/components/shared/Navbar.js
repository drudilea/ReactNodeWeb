import React, { Component } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import AuthService from '../../services/auth-service';
import './navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userImg: '',
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user && user.img) {
      this.setState({ userImg: user.img });
    } else {
      this.setState({
        userImg:
          'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      });
    }
  }

  handleClick() {
    AuthService.logout();
  }

  render() {
    const { userImg } = this.state;
    return (
      <Layout.Header>
        <div className="logo" />
        <div className="user-options-container">
          <div className="user-options-avatar">
            <Avatar src={userImg} />
          </div>
          <Menu theme="dark" mode="horizontal" onClick={this.handleClick}>
            <Menu.Item key="log-out">
              <LogoutOutlined />
              <span>Log out</span>
            </Menu.Item>
          </Menu>
        </div>
      </Layout.Header>
    );
  }
}

export default Navbar;
