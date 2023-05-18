import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ButtonDivStyle = styled.div`
  color: ${(props) => (props.textColor ? props.textColor : "white")};
  font-weight: ${(props) => (props.weight ? props.weight : "500")};
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : props.theme.primary};
  transition: all 0.2s ease;
  cursor: pointer;
`;

const ButtonDiv = ({
  children,
  className,
  bgColor,
  textColor,
  weight,
  onClick = () => {},
  to = "/",
}) => {
  return (
    <ButtonDivStyle
      bgColor={bgColor}
      textColor={textColor}
      weight={weight}
      onClick={onClick}
      className={`button ${className}`}
    >
      <Link to={to}>{children}</Link>
    </ButtonDivStyle>
  );
};

export default ButtonDiv;
