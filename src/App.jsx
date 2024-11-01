// App.jsx
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { LayoutEl, ContentEl, MenuEl, SiderEl } from "./App.js";
import { Link, Outlet } from "react-router-dom";


const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <LayoutEl>
      <SiderEl trigger={null} collapsible collapsed={collapsed}>
        <MenuEl theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <MenuEl.Item
            className="btn"
            key="1"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            title={null}
          />
          <MenuEl.Item key="2" icon={<UserOutlined />}>
            <Link to="/">Home</Link>
          </MenuEl.Item>
          <MenuEl.Item key="3" icon={<VideoCameraOutlined />}>
            <Link to="/profile">Profile</Link>
          </MenuEl.Item>
          <MenuEl.Item key="4" icon={<UploadOutlined />}>
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
