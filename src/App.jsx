import { useAuth } from "./components/AuthContext.jsx";
import { useState } from "react";
import { MdHome, MdExitToApp, MdSettings } from "react-icons/md";
import { TbFileAnalytics } from "react-icons/tb";
import { LuTextSelect } from "react-icons/lu";
import { PiCertificateBold, PiMicrosoftExcelLogoBold } from "react-icons/pi";
import { RiMailSendFill } from "react-icons/ri";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  Divider,
} from "./App.js";

const App = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const username = user?.username || "Visitante";

  const handleLogout = () => {
    if (user) {
      toast.info("Saindo...", {
        autoClose: 500,
      });
    }
    setTimeout(() => {
      logout();
      navigate("/login");
    }, 1000);
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
            <img src="/assets/doctors-fav.svg" alt="Logo" />
          </div>
          {!collapsed && <div className="username">{username}</div>}
        </FavLogo>

        <MenuEl
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          collapsed={collapsed}
        >
          <MenuEl.Item key="1" icon={<MdHome />}>
            <Link to="/">Página Inicial</Link>
          </MenuEl.Item>

          <MenuEl.SubMenu
            key="2"
            title="Gestão de Docs"
            icon={<TbFileAnalytics />}
            className="item"
          >
            <MenuEl.Item key="2.1">
              <Link to="/pgr-pcmso">PGR / PCMSO</Link>
            </MenuEl.Item>
            <MenuEl.Item key="2.2">
              <Link to="/docs/ltcat">LTCAT</Link>
            </MenuEl.Item>
            <MenuEl.Item key="2.3">
              <Link to="/docs/ltcat">Complementos</Link>
            </MenuEl.Item>
          </MenuEl.SubMenu>

          <MenuEl.SubMenu
            key="3"
            title="Gerar Docs"
            icon={<PiCertificateBold  />}
            className="item"
          >
            <MenuEl.Item key="3.1">
              <Link to="/cert-nr35">NR-35</Link>
            </MenuEl.Item>
            <MenuEl.Item key="3.2">
              <Link to="/cert-nr06">NR-06</Link>
            </MenuEl.Item>
            <MenuEl.Item key="3.3">
              <Link to="/cert-nr05">NR-05</Link>
            </MenuEl.Item>
            <MenuEl.Item key="3.4">
              <Link to="/cert-nr18b">NR-18 - Basico de Segurança do Trabalho</Link>
            </MenuEl.Item>
            <MenuEl.Item key="3.5">
              <Link to="/cert-pgr">PGR/PCMSO</Link>
            </MenuEl.Item>
          </MenuEl.SubMenu>

          <MenuEl.Item key="4" icon={<RiMailSendFill />}>
            <Link to="/send-email">Enviar E-mail</Link>
          </MenuEl.Item>

          <MenuEl.SubMenu
            key="5"
            title="Gerar Textos"
            icon={<LuTextSelect />}
            className="item"
          >
            <MenuEl.Item key="5.1">
              <Link to="/text-comple">Complemento Txt</Link>
            </MenuEl.Item>
          </MenuEl.SubMenu>

          <MenuEl.SubMenu
            key="6"
            title="AEP"
            icon={<PiMicrosoftExcelLogoBold />}
            className="item"
          >
            <MenuEl.Item key="6.1">
              <Link to="/aep-trello">Trello Excel</Link>
            </MenuEl.Item>
            <MenuEl.Item key="6.2">
              <Link to="/aep-modelo-heali">Modelo Heali</Link>
            </MenuEl.Item>
          </MenuEl.SubMenu>

          {!collapsed && (
            <MenuEl.Item className="div" key="4" disabled={true}>
              <Divider />
            </MenuEl.Item>
          )}

          <MenuEl.Item key="6" icon={<MdSettings />} className="user-item">
            <Link to="/settings">Configurações</Link>
          </MenuEl.Item>
          <MenuEl.Item
            key="7"
            icon={<MdExitToApp />}
            className="user-item"
            onClick={handleLogout}
          >
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
              <img src="/assets/logo-cropped.svg" alt="Logo" />
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
