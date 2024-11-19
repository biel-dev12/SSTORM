import { useAuth  } from "./components/AuthContext.jsx";
import { useState } from "react";
import { MdHome, MdExitToApp, MdSettings } from "react-icons/md";
import { TbFileAnalytics, TbDatabaseSearch } from "react-icons/tb";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import {
  LayoutEl,
  HeaderEl,
  SiderEl,
  ContentEl,
  MenuEl,
  FavLogo,
  Logo,
  CloseMenu,
  OpenMenu,
  CollapseButton,
  Divider
} from "./App.js";

const App = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/signup");
  };

  return (
    <LayoutEl>
      <SiderEl
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={50}
      >
         <FavLogo>
          <div className="img-box">
            <img src="./src/assets/doctors-fav.svg" alt="Logo" />
          </div>
          {!collapsed && <div className="username">Gabriel_tec</div>}
        </FavLogo>
        
        <MenuEl
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          collapsed={collapsed}
        >
          <MenuEl.Item key="1" icon={<MdHome />}>
            <Link to="/home">Home</Link>
          </MenuEl.Item>

          <MenuEl.SubMenu
            key="2"
            title="Docs"
            icon={<TbFileAnalytics />}
            className="item"
          >
            <MenuEl.Item key="2.1">
              <Link to="/docs/option1">Option 1</Link>
            </MenuEl.Item>
            <MenuEl.Item key="2.2">
              <Link to="/docs/option2">Option 2</Link>
            </MenuEl.Item>
          </MenuEl.SubMenu>

          <MenuEl.Item key="3" icon={<TbDatabaseSearch />}>
            <Link to="/settings">Banco de Cargos</Link>
          </MenuEl.Item>

          {!collapsed && (
            <MenuEl.Item className="div" key="4" disabled={true}>
              <Divider />
            </MenuEl.Item>
          )}

          <MenuEl.Item key="5" icon={<MdSettings />} className="user-item">
            <Link to="/settings">Configurações</Link>
          </MenuEl.Item>
          <MenuEl.Item key="6" icon={<MdExitToApp />} className="user-item" onClick={handleLogout}>
            Sair
          </MenuEl.Item>
        </MenuEl>
      </SiderEl>
      <LayoutEl>
        <HeaderEl>
          <CollapseButton
            type="text"
            icon={collapsed ? <OpenMenu /> : <CloseMenu />}
            onClick={() => setCollapsed(!collapsed)}
            collapsed={collapsed}
          />
          <Logo>
            <div className="img-box">
              <img src="./src/assets/logo-cropped.svg" alt="Logo" />
            </div>
          </Logo>
        </HeaderEl>
        <ContentEl collapsed={collapsed}>
          <Outlet />
          <ToastContainer />
        </ContentEl>
      </LayoutEl>
    </LayoutEl>
  );
};

export default App;
