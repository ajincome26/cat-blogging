import React from "react";
import styled from "styled-components";
import PostRelatedItem from "./PostRelatedItem";

const PostRelatedStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 1rem;
  margin: 4rem 0 2rem;
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
