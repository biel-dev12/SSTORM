import styled from "styled-components";
import { theme } from "../../Theme";

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  font-family: Arial, sans-serif;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead``;
export const TableRow = styled.tr``;

export const TableCell = styled.th`
  padding: 8px 6px;
  border: 1px solid ${theme.colors.black};
  text-align: ${(props) => (props.alignCenter ? "center" : "left")};
  font-size: 0.75rem;
  font-weight: 400;
  min-width: ${(props) => props.minWidth || "auto"};
  white-space: ${(props) => (props.noWrap ? "nowrap" : "normal")};

  &.head {
    font-size: ${(props) => (props.small ? ".6rem" : ".8rem")};
    font-weight: bold;
    background-color: ${theme.colors.excel.darkGray};
    color: ${theme.colors.background};
  }

  ${({ className }) => {
    const colorClasses = {
      contele: theme.colors.excel.lightBlue,
      basic: theme.colors.excel.lightOrange,
      insp: theme.colors.excel.lightBrown,
      "doc-def": theme.colors.excel.lightGreen2,
      env: theme.colors.excel.green,
    };

    return className &&
      colorClasses[className] &&
      `background-color: ${colorClasses[className]};`;
  }}

  &.head.contele {
    background-color: ${theme.colors.excel.darkblue};
  }

  &.head.basic {
    background-color: ${theme.colors.excel.darkOrange};
  }

  &.head.insp {
    background-color: ${theme.colors.excel.brown};
  }

  &.head.doc-def {
    background-color: ${theme.colors.excel.lightGreen1};
  }

  &.head.env {
    background-color: ${theme.colors.excel.darkGreen};
  }

  &.comp{
    text-align: left;
  }

  @media screen and (min-width: 1500px) {
    font-size: 1rem;
  }

`;

export const TableInput = styled.input`
  padding: 0px;
  width: 100%;
  border: none;
  outline: none;
  text-align: center;
  background-color: transparent;

  ${({ field }) => {
    const widths = {
      sg_city: "2rem",
      nm_comp_or_cond: "1rem",
      nm_neighborhood: "100px",
      nm_comp_name: "200px",
      cd_cnpj: "6.8rem",
      dt_contele: "120px",
      resp_contele: "100px",
    };

    return field && widths[field] && `width: ${widths[field]};`;
  }}
`;


export const TableBody = styled.tbody``;
