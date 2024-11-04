import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import { LayoutEl, HeaderEl, SiderEl, ContentEl, MenuEl, UserLogo } from './App.js'; 

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <LayoutEl>
      <SiderEl trigger={null} collapsible collapsed={collapsed}>
        <UserLogo>
          <img src="./src/assets/fav-cropped.svg" alt="Logo" /> 
        </UserLogo>
        <MenuEl theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <MenuEl.Item key="1" icon={<UserOutlined />}>
            <Link to="/">Home</Link>
          </MenuEl.Item>
          <MenuEl.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to="/profile">Profile</Link> 
          </MenuEl.Item>
          <MenuEl.Item key="3" icon={<UploadOutlined />}>
            <Link to="/settings">Settings</Link> 
          </MenuEl.Item>
        </MenuEl>
      </SiderEl>
      <LayoutEl>
        <HeaderEl>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </HeaderEl>
        <ContentEl>
          <Outlet /> 
        </ContentEl>
      </LayoutEl>
    </LayoutEl>
  );
};

export default App;
