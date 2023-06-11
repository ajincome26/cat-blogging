import React from "react";
import styled from "styled-components";
import PostRelatedItem from "./PostRelatedItem";

const PostRelatedStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-gap: 1rem;
  margin: 1rem 0 2rem;
  @media only screen and (min-width: 375px) {
    margin: 4rem 0 2rem;
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  @media only screen and (min-width: 500px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media only screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const PostRelated = ({ data }) => {
  return (
    <PostRelatedStyle className="related-list">
      {data?.map((item) => (
        <PostRelatedItem key={item.id} post={item} />
      ))}
    </PostRelatedStyle>
  );
};

export default PostRelated;
