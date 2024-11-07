import styled from "styled-components";
import { theme } from "./Theme";
import { Layout, Menu, Button } from "antd";
import { MdClose, MdMenu } from "react-icons/md";

export const LayoutEl = styled(Layout)`
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.background};
`;

export const ContentEl = styled(Layout.Content)`
  filter: ${({ collapsed }) => (collapsed ? "none" : "blur(1px)")};
  padding: 0 10px;
  min-height: 280px;
  background: ${theme.colors.background};
`;

export const MenuEl = styled(Menu)`
  background-color: ${theme.colors.primary};
  font-family: K2D, sans-serif;

  .ant-menu-item-icon {
    font-size: 1.1rem !important;
    color: ${theme.colors.white} !important;
  }

  .item {
    &.ant-menu-submenu-open,
    &.ant-menu-submenu-active {
      background-color: ${theme.colors.blue} !important;
    }
  }

  .ant-menu-item,
  .item {
    color: ${theme.colors.white} !important;
    padding-left: ${({ collapsed }) => (collapsed ? "" : "1rem")}!important;

    &:hover {
      background-color: ${theme.colors.lightBlue} !important;
    }

    &.ant-menu-item-selected {
      background-color: ${theme.colors.orange} !important;
    }

    & .ant-menu-submenu-title {
      padding-left: ${({ collapsed }) => (collapsed ? "" : "0px")}!important;
      background: transparent !important;
      color: ${theme.colors.white};
    }
  }

  .div {
    cursor: default;
    height: 2px;
    &:hover {
      background-color: transparent !important;
    }
  }
`;

export const SiderEl = styled(Layout.Sider)`
  background-color: ${theme.colors.primary};
`;

export const HeaderEl = styled(Layout.Header)`
  width: 100%;
  height: 8vh;
  padding: 0 1rem;
  background-color: ${theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${theme.colors.gray};
`;

export const CollapseButton = styled(Button)`
  z-index: 1;
  background-color: ${({ collapsed }) =>
    collapsed ? "transparent" : theme.colors.blue};
  border: none;
  outline: none !important;
  color: ${({ collapsed }) =>
    collapsed ? theme.colors.text : theme.colors.white};
  transition: all 0.3s;

  &:hover {
    background-color: ${theme.colors.orange} !important;
    color: ${theme.colors.white} !important;
  }
`;

export const CloseMenu = styled(MdClose)`
  font-size: 1.5rem;
`;
export const OpenMenu = styled(MdMenu)`
  font-size: 1.5rem;
`;

export const FavLogo = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background: transparent;

  .img-box {
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.white};
    border-radius: 50%;
    padding: 0.2rem;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .username {
    margin-left: 1rem;
    color: ${theme.colors.white};
    font-size: 1rem;
    font-weight: bold;
  }
`;

export const Logo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;

  .img-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;

    img {
      width: 40%;

      @media screen and (max-width: 576px) {
        width: 35%;
      }

      @media screen and (min-width: 576px) and (max-width: 768px) {
        width: 35%;
      }

      @media screen and (min-width: 768px) and (max-width: 992px) {
        width: 20%;
      }

      @media screen and (min-width: 992px) {
        width: 15%;
      }
    }
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  border-radius: 1rem;
  background-color: ${theme.colors.orange};
`;
