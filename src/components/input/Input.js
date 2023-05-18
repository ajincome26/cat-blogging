import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const InputStyle = styled.div`
  width: 100%;
  position: relative;
  input {
    padding: ${(props) => (props.hasIcon ? "12px 40px 12px 12px" : "12px")};
    border-radius: 8px;
    border: 1px solid transparent;
    width: 100%;
    background-color: ${(props) =>
      props.bgColor ? props.bgColor : props.theme.gray};
    transition: all 0.2s linear;
  }
  input::-webkit-input-placeholder {
    color: #84878b;
  }
  input:focus {
    border-color: ${(props) => props.theme.secondary};
    background-color: white;
  }
  input:hover {
    border-color: #2c3e50;
  }
  .icon {
    position: absolute;
    color: ${(props) => props.theme.primary};
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const Input = ({ name, type, children, control, bgColor, ...props }) => {
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <InputStyle hasIcon={children ? true : false} bgColor={bgColor}>
      <input id={name} type={type || "text"} {...field} {...props} />
      {children}
    </InputStyle>
  );
};

export default Input;
