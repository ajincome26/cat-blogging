import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PostTopicStyle = styled.span`
  border-radius: 10px;
  padding: ${(props) => (props.padding ? props.padding : "5px 10px")};
  color: ${(props) =>
    props.textColor ? props.textColor : props.theme.primary};
  font-weight: 500;
  font-size: ${(props) => (props.size ? props.size : "14px")};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "white")};
`;

const PostTopic = ({
  children,
  size,
  padding,
  textColor,
  bgColor,
  to = "/",
}) => {
  return (
    <PostTopicStyle
      className="post-topic"
      size={size}
      padding={padding}
      textColor={textColor}
      bgColor={bgColor}
    >
      <Link to={`/category/${to}`}>{children}</Link>
    </PostTopicStyle>
  );
};

export default PostTopic;
