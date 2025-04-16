import styled from "styled-components";
import { Select, Table } from "antd";
import { theme } from "../../Theme";
import { FaEdit } from "react-icons/fa";

export const Container = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 800px;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  color: ${theme.colors.text};
`;

export const MonthSelector = styled(Select)`
  width: 120px;
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const TablePGR = styled(Table)`
  min-width: max-content;

  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    white-space: nowrap; /* evita quebra de linha */
  }

  .ant-table-thead > tr > th {
    color: white !important;
    font-weight: 600;
    text-align: center;
    font-size: 0.9rem;
    padding: 6px 10px;
    border: 1px solid ${theme.colors.black};

    &.ant-table-cell::before {
      display: none;
    }

    &.actions {
      background: ${theme.colors.background}!important;
      border: none;
    }

    &.radius {
      border-top-left-radius: 12px;
    }

    &.col-gray {
    background: ${theme.colors.background}!important;
      background-color: ${theme.colors.excel.darkGray} !important;
    }

    &.col-contele {
      background-color: ${theme.colors.excel.darkblue} !important;
    }

    &.col-basic-doc {
      background-color: ${theme.colors.excel.darkOrange} !important;
    }

    &.col-inspection {
      background-color: ${theme.colors.excel.brown} !important;
    }

    &.col-definitive-doc {
      background-color: ${theme.colors.excel.lightGreen1} !important;
    }

    &.col-submission {
      background-color: ${theme.colors.excel.darkGreen} !important;
    }
  }

  .ant-table-tbody > tr > td {
    color: ${theme.colors.black} !important;
    font-weight: 500;
    padding: 6px 4px;
    text-align: center;
    border: 1px solid ${theme.colors.black};
    font-size: 0.75rem;

    &.text-left {
      text-align: left;
    }

    &.obs {
      color: ${theme.colors.error} !important;
    }

    &.col-contele {
      background-color: ${theme.colors.excel.lightBlue} !important;
    }

    &.col-basic-doc {
      background-color: ${theme.colors.excel.lightOrange} !important;
    }

    &.col-inspection {
      background-color: ${theme.colors.excel.lightBrown} !important;
    }

    &.col-definitive-doc {
      background-color: ${theme.colors.excel.lightGreen2} !important;
    }

    &.col-submission {
      background-color: ${theme.colors.excel.green} !important;
    }
  }
`;

export const Edit = styled(FaEdit)`
  font-size: 0.9rem;
  margin-left: 2px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.5);
  }
`;

export const ToggleDashboardButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  color: ${theme.colors.text};
  transition: all 0.3s;

  &:hover {
    transform: scale(1.2);
    background-color: ${theme.colors.text};
    & .btn{
      color: ${theme.colors.white};
    }
  }

  & .btn{
    font-size: 2rem;
  }
`;

export const DashboardContainer = styled.div`
  width: 100%;
  max-height: ${(props) => (props.$open ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.4s ease;
  background-color: ${theme.colors.backgroundLight || "#f9f9f9"};
  padding: ${(props) => (props.$open ? "15px" : "0 15px")};
  box-shadow: ${(props) => (props.$open ? "0 2px 4px rgba(0,0,0,0.1)" : "none")};
  margin-bottom: 10px;

  h3 {
    margin-top: 0;
    font-size: 1rem;
  }

  p {
    font-size: 0.9rem;
    margin: 5px 0;
  }
`;

