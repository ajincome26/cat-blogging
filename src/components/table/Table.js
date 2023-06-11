import React from "react";
import styled from "styled-components";
const TableStyles = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: scroll;
  table {
    width: 100%;
  }
  thead {
    background-color: #f7f7f8;
  }
  th,
  td {
    vertical-align: middle;
    white-space: nowrap;
    text-align: left;
  }
  th {
    color: ${(props) => props.theme.primary};
    padding: 20px 30px;
    font-weight: 600;
  }
  td {
    padding: 15px 30px;
  }
  tbody {
  }
`;
const Table = ({ children }) => {
  return (
    <TableStyles>
      <table>{children}</table>
    </TableStyles>
  );
};

export default Table;
