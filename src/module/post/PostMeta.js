import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PostMetaStyle = styled.div`
  color: ${(props) => (props.textColor ? props.textColor : "white")};
  display: flex;
  align-items: center;
  gap: 10px;
  letter-spacing: 2px;
  font-size: ${(props) => (props.size ? props.size : "14px")};
  .meta-dot {
    width: 5px;
    height: 5px;
    border-radius: 100rem;
    background-color: ${(props) => (props.color ? props.color : "white")};
  }
`;

const PostMeta = ({ meta }) => {
  const {
    created = "Mar 25",
    author = "Cristiano",
    color,
    size,
    textColor,
    to = "/",
  } = meta;
  return (
    <PostMetaStyle
      className="post-meta"
      color={color}
      size={size}
      textColor={textColor}
    >
      <span className="meta-created">{created}</span>
      <span className="meta-dot"></span>
      <Link to={`/author/${to}`}>
        <span className="meta-author">{author}</span>
      </Link>
    </PostMetaStyle>
  );
};

export default PostMeta;
