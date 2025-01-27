import styled from "styled-components";
import { theme } from "../../Theme";
import { BiSolidMessageSquareEdit } from "react-icons/bi";


export const EditIcon = styled(BiSolidMessageSquareEdit)`
  color: ${theme.colors.primary};
`

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

export const TableBody = styled.tbody``;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  max-width: 500px;
  width: 100%;
  padding: 20px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;

  h2 {
    font-size: 1.1rem;
    margin: 0;
    color: ${theme.colors.black};
  }

  button {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: ${theme.colors.primary};
    transition: color 0.2s;
    outline: none;

    &:hover {
      color: ${theme.colors.black};
    }
  }
`;

export const ModalContent = styled.div`
  margin: 20px 0;

  label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
    color: #555;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.primary};
    color: #fff;
  }

  ${({ primary }) =>
    primary
      ? `
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  `
      : `
    background-color: ${theme.colors.gray};
    color: ${theme.colors.text};
  `}
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 15px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;