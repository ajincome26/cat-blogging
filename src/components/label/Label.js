import React from "react";
import styled from "styled-components";

const LabelStyle = styled.label`
  color: ${(props) => props.theme.primary};
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
`;

const Label = ({ htmlFor, children }) => {
  return (
    <LabelStyle htmlFor={htmlFor} className="label">
      {children}
    </LabelStyle>
  );
};

export default Label;
