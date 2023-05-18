import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PostImageStyle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .overlay {
    position: absolute;
    width: ${(props) => (props.overlayNone ? "0%" : "100%")};
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: inherit;
    transition: all 0.3s linear;
  }
  &:hover {
    .overlay {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

const PostImage = ({ className, src, to = "/", overlayNone }) => {
  return (
    <PostImageStyle className={className} overlayNone={overlayNone}>
      <Link to={to}>
        <div className="overlay"></div>
        <img src={src} alt="img" loading="lazy" />
      </Link>
    </PostImageStyle>
  );
};

export default PostImage;
