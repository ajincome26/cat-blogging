import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PostCategoryStyle = styled.div`
  .block {
    width: 35px;
    height: 3px;
    border-radius: 1px;
    background-color: ${(props) => props.theme.third};
  }
  .header {
    font-size: 28px;
    color: ${(props) => props.theme.primary};
    margin-bottom: 10px;
  }
`;

const PostCategory = ({ header, to = "/" }) => {
  return (
    <PostCategoryStyle className="category">
      <Link to={to}>
        <div className="block"></div>
        <h1 className="header">{header}</h1>
      </Link>
    </PostCategoryStyle>
  );
};

export default PostCategory;
