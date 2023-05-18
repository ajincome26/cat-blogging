import React from "react";
import styled, { css } from "styled-components";
import { RotatingLines } from "react-loader-spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ButtonStyle = styled.button`
  ${(props) =>
    props.bgColor
      ? css`
          background-color: ${(props) => props.bgColor};
        `
      : css`
          background-image: linear-gradient(
            to right,
            ${(props) => props.theme.primary} 0%,
            ${(props) => props.theme.secondary} 51%,
            ${(props) => props.theme.primary} 100%
          );
        `};
  color: white;
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "100%")};
  margin: ${(props) => (props.margin ? props.margin : "0px")};
  padding: ${(props) => (props.padding ? props.padding : "12px 80px")};
  border-radius: 10px;
  font-weight: 500;
  font-size: ${(props) => props.size && props.size};
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  display: block;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    ${(props) =>
      props.bgHover &&
      css`
        opacity: 0.85;
      `};
    background-position: right center;
    color: #fff;
  }
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

/**
 * @param {*} onClick Handler onClick
 * @requires
 * @param {string} type Type of button 'button' | 'submit'
 */

const Button = ({ type, children, isLoading, onClick, to, ...props }) => {
  if (to !== "" && typeof to === "string") {
    return (
      <Link
        to={to}
        style={{
          display: "inline-block",
        }}
      >
        <ButtonStyle type={type || "button"} onClick={onClick} {...props}>
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.5"
              width="25"
              visible={true}
            />
          ) : (
            children
          )}
        </ButtonStyle>
      </Link>
    );
  }
  return (
    <ButtonStyle type={type || "button"} onClick={onClick} {...props}>
      {isLoading ? (
        <RotatingLines
          strokeColor="white"
          strokeWidth="5"
          animationDuration="0.5"
          width="25"
          visible={true}
        />
      ) : (
        children
      )}
    </ButtonStyle>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
