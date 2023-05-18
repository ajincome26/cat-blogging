import React from "react";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import PostTopic from "./PostTopic";
import styled from "styled-components";
import { formatDateV1 } from "utils/constants";

const PostNewestItemStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #ccc;
  margin-bottom: 1rem;
  padding-bottom: 1rem;

  .item-image {
    width: 180px;
    height: 130px;
    flex-shrink: 0;
    cursor: pointer;
  }
  .item-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const PostNewestItem = ({ data }) => {
  return (
    <PostNewestItemStyle className="newest-item">
      <PostImage
        className="item-image"
        src={data.url}
        to={`/posts/${data?.slug}/${data?.id}`}
      />
      <div className="item-content">
        <PostTopic size="13px" padding="2px 10px" to={`${data.category.slug}`}>
          {data.category.name}
        </PostTopic>
        <PostTitle to={`/posts/${data?.slug}/${data?.id}`}>
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
    </PostNewestItemStyle>
  );
};

export default PostNewestItem;
