import styled from "styled-components";

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background: #f4f4f4;
`;

export const TableRow = styled.tr``;

export const TableCell = styled.th`
  padding: 8px;
  border: 1px solid #ccc;
  text-align: ${(props) => (props.alignCenter ? "center" : "left")};
  font-size: .75rem;
  min-width: ${(props) => (props.minWidth ? props.minWidth : "auto")}; 
  white-space: ${(props) => (props.noWrap ? "nowrap" : "normal")};

  &.head{
  font-size: .8rem;
  }
`;

export const TableBody = styled.tbody`
  tr:nth-child(even) {
    background: #f9f9f9;
  }
`;
