import styled from "styled-components";
import { theme } from "./Theme";
import { Layout, Menu } from "antd";

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
    font-size: 22px!important;
    color: ${theme.colors.white}!important;
  }

  .btn{
    .anticon{
    color: red!important;
    }
}
`;

export const SiderEl = styled(Layout.Sider)`
  background-color: ${theme.colors.primary};
`;
