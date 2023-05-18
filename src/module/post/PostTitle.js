import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PostTitleStyle = styled.p`
  color: ${(props) => (props.textColor ? props.textColor : "white")};
  font-weight: 600;
  line-height: 1.5;
  cursor: pointer;
  font-size: ${(props) => (props.size ? props.size : "16px")};
`;

const PostTitle = ({
  className,
  children,
  size,
  textColor,
  to = "/",
  title = "",
}) => {
  return (
    <PostTitleStyle
      className={`post-title ${className}`}
      size={size}
      textColor={textColor}
      title={title}
    >
      <Link to={to}>{children}</Link>
    </PostTitleStyle>
  );
};

export default PostTitle;
