import React from "react";
import styled from "styled-components";

const FieldStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  margin-bottom: 20px;
  ::last-child {
    margin-bottom: 0;
  }
`;
const Field = ({ children }) => {
  return <FieldStyle>{children}</FieldStyle>;
};

export default Field;
