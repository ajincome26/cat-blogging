import React from "react";
import { formatDateV1 } from "utils/constants";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import PostTopic from "./PostTopic";

const PostRelatedItem = ({ post }) => {
  if (!post) return null;
  return (
    <div className="flex flex-col related-item gap-[1rem] flex-1">
      <div className="related-image h-[250px] cursor-pointer">
        <PostImage
          className="related-image"
          src={post?.url}
          to={`/posts/${post?.slug}/${post?.id}`}
        />
      </div>
      <div className="related-content flex flex-col items-start gap-[10px] flex-1">
        <PostTopic size="13px" bgColor="#e0e7f0" to={post.category?.slug}>
          {post?.category.name}
        </PostTopic>
        <PostTitle
          className="truncate-3"
          textColor="#2c3e50"
          to={`/posts/${post?.slug}/${post?.id}`}
          title={post?.title}
        >
          {post?.title}
        </PostTitle>
        <div className="mt-auto">
          <PostMeta
            meta={{
              created: `${formatDateV1(post?.createdAt)}`,
              author: `${post?.user.username}`,
              color: "#4ca1af",
              size: "15px",
              textColor: "#2c3e50",
              to: `${post?.user?.username}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostRelatedItem;
