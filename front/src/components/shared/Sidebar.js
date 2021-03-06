import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { AuditOutlined, PictureOutlined } from '@ant-design/icons';

import './sidebar.css';

const Sidebar = () => {
  let location = useLocation();
  const [locationKey, setLocationKey] = useState(location.pathname);
  return (
    <Layout.Sider className="sidebar-container">
      <Menu
        mode="inline"
        defaultSelectedKeys={[locationKey]}
        style={{ borderRight: 0 }}
      >
        <Menu.Item key="/home/ext/posts" icon={<AuditOutlined />}>
          <Link to={`/home/ext/posts`}>Posts</Link>
        </Menu.Item>
        <Menu.Item key="/home/ext/photos" icon={<PictureOutlined />}>
          <Link to={`/home/ext/photos`}>Photos</Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};
export default Sidebar;
