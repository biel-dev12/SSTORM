// App.jsx
import { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import { LayoutEl, ContentEl, MenuEl, SiderEl, CollapseButton, HeaderEl, Logo, MenuIcon, CloseIcon } from "./App.js";
import { Link, Outlet } from "react-router-dom";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <LayoutEl>
      <SiderEl trigger={null} collapsible collapsed={collapsed}>
        <HeaderEl collapsed={collapsed}>
        {!collapsed && <Logo src="./src/assets/logo.png" alt="Logo" />}
        <CollapseButton
            icon={collapsed ? <MenuIcon /> : <CloseIcon />}
            onClick={() => setCollapsed(!collapsed)} />
        </HeaderEl>
        <MenuEl theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
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
        <ContentEl>
          <Outlet /> 
        </ContentEl>
      </LayoutEl>
    </LayoutEl>
  );
};

export default App;
