import styled from 'styled-components';
import { theme } from './Theme';
import { Layout, Menu, Button } from 'antd';

export const LayoutEl = styled(Layout)`
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.background};
`;

export const ContentEl = styled(Layout.Content)`
  padding: 10px;
  min-height: 280px;
  background: ${theme.colors.background};
`;

export const MenuEl = styled(Menu)`
  background-color: ${theme.colors.primary};
  .ant-menu-item-icon {
    color: ${theme.colors.white} !important;
  }

  .ant-menu-item {
    color: ${theme.colors.white} !important;
    &:hover {
      background-color: ${theme.colors.lightBlue} !important;
    }

    &.ant-menu-item-selected {
      background-color: ${theme.colors.orange} !important;
    }
  }
`;

export const SiderEl = styled(Layout.Sider)`
  background-color: ${theme.colors.primary};
`;

export const HeaderEl = styled(Layout.Header)`
  padding: 0;
  background-color: ${theme.colors.lightBlue};
  display: flex;
  align-items: center;
`;

export const CollapseButton = styled(Button)`
  font-size: 16px;
  background-color: transparent;
  border: none;
  color: ${theme.colors.text};
`;

export const UserLogo = styled.div`
  margin: .2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  color: ${theme.colors.white}; // Mude a cor conforme necessário
  font-size: 18px; // Ajuste o tamanho da fonte conforme necessário
  background: ${theme.colors.white}; // Mantenha a cor de fundo ou altere conforme necessário

  img {
    border-radius: 50%; // Para uma logo em formato circular
    /* margin-right: 10px; // Espaçamento entre a imagem e o texto */
    width: 30px; // Ajuste o tamanho da imagem conforme necessário
    height: 30px; // Ajuste o tamanho da imagem conforme necessário
  }
`;
