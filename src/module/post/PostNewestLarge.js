import React from "react";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import PostTopic from "./PostTopic";
import styled from "styled-components";
import { formatDateV1 } from "utils/constants";

const PostNewestLargeStyle = styled.div`
  .newest-large {
    flex-basis: 50%;
  }
  .newest-image {
    width: 100%;
    height: 400px;
    margin-bottom: 1rem;
    cursor: pointer;
  }
`;

const PostNewestLarge = ({ data }) => {
  if (!data) return null;
  return (
    <PostNewestLargeStyle className="newest-large">
      <PostImage
        className="newest-image"
        src={data.url}
        to={`/posts/${data.slug}/${data.id}`}
      />
      <div className="newest-content flex flex-col items-start gap-[10px]">
        <PostTopic size="13px" bgColor="#e0e7f0" to={`${data.category.slug}`}>
          {data.category.name}
        </PostTopic>
        <PostTitle size="18px" to={`/posts/${data.slug}/${data.id}`}>
          {data.title}
        </PostTitle>
        <PostMeta
          meta={{
            created: `${formatDateV1(data.createdAt)}`,
            author: `${data.user.username}`,
            color: "#4ca1af",
            size: "12px",
            to: `${data.user.username}`,
          }}
        />
      </div>
    </PostNewestLargeStyle>
  );
};

export default PostNewestLarge;
