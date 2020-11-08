import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { AuditOutlined, PictureOutlined } from '@ant-design/icons';

import './navbar.css';

const Sidebar = () => {
  let match = useRouteMatch();
  return (
    <Layout.Sider
      width={200}
      style={{ height: 'fit-content' }}
      className="site-layout-background"
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['posts']}
        style={{ borderRight: 0 }}
      >
        {/* <Menu.Item key="profile" icon={<UserOutlined />}>
          <Link to={'/home/profile'}>Profile</Link>
        </Menu.Item> */}
        <Menu.Item key="posts" icon={<AuditOutlined />}>
          <Link to={`${match.url}/ext/posts`}>Posts</Link>
        </Menu.Item>
        <Menu.Item key="photos" icon={<PictureOutlined />}>
          <Link to={`${match.url}/ext/photos`}>Photos</Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};
export default Sidebar;
