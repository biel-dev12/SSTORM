import styled from "styled-components";
import { Select, Table } from "antd";
import { theme } from "../../Theme";

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

export const TablePGR = styled(Table)`
   .ant-table-thead > tr > th {
    color: white !important;
    font-weight: 600;
    text-align: center;
    font-size: .9rem;
    padding: 6px 10px;
    border: 1px solid ${theme.colors.black};

    &.ant-table-cell::before{
      display: none;
    }

    &.col-gray {
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
    color: ${theme.colors.text} !important;
    font-weight: 500;
    padding: 6px 4px;
    text-align: center;
    border: 1px solid ${theme.colors.black};


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
