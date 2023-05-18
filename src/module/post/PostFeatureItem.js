import React from "react";
import styled from "styled-components";
import { formatDateV1 } from "utils/constants";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import PostTopic from "./PostTopic";

const PostFeatureItemStyle = styled.div`
  position: relative;
  height: 300px;
  .feature {
    &-image {
      cursor: pointer;
    }
    &-content {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      padding: 15px;
    }
    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      margin-bottom: 1rem;
    }
  }
`;

const PostFeatureItem = ({ feature }) => {
  if (!feature) return null;

  return (
    <PostFeatureItemStyle className="feature">
      <PostImage
        className="feature-image"
        src={feature.url}
        to={`posts/${feature.slug}/${feature.id}`}
      />
      <div className="feature-content">
        <div className="feature-header">
          <PostTopic to={`${feature.category?.slug}`}>
            {feature.category?.name}
          </PostTopic>
          <PostMeta
            meta={{
              created: `${formatDateV1(feature.createdAt)}`,
              author: `${feature.user?.username || "Anonymous"}`,
              color: "white",
              to: `${feature.user?.username}`,
            }}
          ></PostMeta>
        </div>
        <PostTitle to={`/posts/${feature.slug}/${feature.id}`}>
          {feature.title}
        </PostTitle>
      </div>
    </PostFeatureItemStyle>
  );
};
export default PostFeatureItem;
