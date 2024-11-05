import { useState } from "react";
import { MdHome, MdExitToApp, MdSettings } from "react-icons/md";
import { TbFileAnalytics, TbDatabaseSearch } from "react-icons/tb";
import { Outlet, Link } from "react-router-dom";
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
  const [collapsed, setCollapsed] = useState(true);

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
            <img src="./src/assets/fav-cropped.svg" alt="Logo" />
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
            <Link to="/">Home</Link>
          </MenuEl.Item>
          <MenuEl.Item key="2" icon={<TbFileAnalytics />}>
            <Link to="/profile">Docs</Link>
          </MenuEl.Item>
          <MenuEl.Item key="3" icon={<TbDatabaseSearch />}>
            <Link to="/settings">Banco de Cargos</Link>
          </MenuEl.Item>

          {!collapsed && <MenuEl.Item className="div" key="4" disabled={true}>
          <Divider />
          </MenuEl.Item>}

          <MenuEl.SubMenu key="sub1" icon={<MdSettings />} title="Configurações">
            <MenuEl.Item key="5">
              <Link to="/profile-settings">Configurações de Perfil</Link>
            </MenuEl.Item>
            <MenuEl.Item key="6">
              <Link to="/app-settings">Configurações do App</Link>
            </MenuEl.Item>
          </MenuEl.SubMenu>

          <MenuEl.Item key="7" icon={<MdExitToApp />}>
            <Link to="/logout">Sair</Link>
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
        <ContentEl>
          <Outlet />
        </ContentEl>
      </LayoutEl>
    </LayoutEl>
  );
};

export default App;
