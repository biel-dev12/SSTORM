import styled from "styled-components";
import { theme } from "./Theme";
import { Layout, Menu, Button } from "antd";
import { MdDehaze, MdOutlineClose } from "react-icons/md";

export const LayoutEl = styled(Layout)`
  width: 100vw;
  height: 100vh;
  background-color: white;
`;

export const ContentEl = styled(Layout.Content)`
  margin: 5px 10px;
  padding: 0px 0px;
  min-height: 280;
  background: ${theme.colors.background};
  border-radius: 12px;
`;

export const MenuEl = styled(Menu)`
  background-color: ${theme.colors.primary};
  .ant-menu-item-icon {
    font-size: 22px !important;
    color: ${theme.colors.white}!important;
  }

  .ant-menu-item {
    color: ${theme.colors.white}!important;
    font-size: ${theme.fonts.medium};
    &:hover {
      background-color: ${theme.colors.lightBlue}!important;
    }

    &.ant-menu-item-selected {
      background-color: ${theme.colors.orange}!important;
    }
  }
`;

export const SiderEl = styled(Layout.Sider)`
  background-color: ${theme.colors.primary};
`;

export const HeaderEl = styled(Layout.Header)`
  width: 100%: 
  transition: all 1s;
  display: flex;
  justify-content: ${({ collapsed }) =>
    collapsed ? "center" : "space-between"};
  align-items: center; 
  padding: 0.5rem;
  background-color: ${theme.colors.lightBlue};
  margin: 0.5rem;
  border-radius: 1rem;
`;

export const CollapseButton = styled(Button)`
  background-color: transparent;
  border: none;
  outline: none!important;
`;

export const MenuIcon = styled(MdDehaze)`
  // background-color: transparent;
  width: 2rem!important;

`;

export const CloseIcon = styled(MdOutlineClose)`
  // background-color: transparent;

`;

export const Logo = styled.img`
  width: 100%;
  height: auto;
`;

