import React from "react";
import parse from "html-react-parser";
import NotFoundPage from "./NotFoundPage";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { PostMeta, PostRelatedItem, PostTitle, PostTopic } from "module/post";
import { formatDateV1 } from "utils/constants";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import AuthorBlock from "components/author/AuthorBlock";

const PostDetailsPage = () => {
  const params = useParams();
  const postId = params.id;
  const [post, setPost] = useState("");
  const [postsRelated, setPostsRelated] = useState([]);

  // Scroll Top
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [postId]);

  useEffect(() => {
    async function getPost() {
      const docRef = doc(db, "posts", postId);
      const post = await getDoc(docRef);
      setPost(post.data());
    }
    getPost();
  }, [postId]);

  useEffect(() => {
    async function getPostsByCategoryId() {
      const categoryId = post?.category?.id;
      const q = query(
        collection(db, "posts"),
        where("category.id", "==", categoryId)
      );
      onSnapshot(q, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        const posts = results.filter((item) => item.id !== postId);
        setPostsRelated(posts);
      });
    }
    getPostsByCategoryId();
  }, [post?.category?.id, postId]);

  if (!postId) return <NotFoundPage />;
  return (
    <>
      <div className="container">
        <div className="flex flex-col items-center gap-10 mb-14 md:flex-row">
          <div className="h-[450px] overflow-hidden rounded-2xl basis-1/2">
            <img src={post.url} alt="" className="object-cover w-full h-full" />
          </div>
          <div className="flex flex-col items-start gap-3 basis-1/2">
            <PostTopic
              size="14px"
              padding="5px 20px"
              bgColor="#ccc"
              to={post.category?.slug}
            >
              {post.category?.name}
            </PostTopic>
            <PostTitle
              textColor="#2c3e50"
              size="30px"
              to={`/posts/${post?.slug}/${postId}`}
            >
              {post.title}
            </PostTitle>
            <PostMeta
              meta={{
                created: `${formatDateV1(
                  post.createdAt || {
                    nanoseconds: 249000000,
                    seconds: 1684120521,
                  }
                )}`,
                author: `${post.user?.username || "Anonymous"}`,
                color: "#2c3e50",
                size: "16px",
                textColor: "#2c3e50",
                to: `${post?.user?.username}`,
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto mb-12 post-content text-grayDark">
          <div className="entry-content">{parse(post.content || "")}</div>
        </div>

        {/* Author Block */}
        <div className="pb-16">
          <AuthorBlock userId={post.user?.id} />
        </div>
      </div>
      {postsRelated.length > 0 && (
        <div className="container">
          <div className="text-2xl font-bold text-primary">Post Related</div>
          <div className="grid grid-cols-1 gap-5 mt-10 mb-5 md:grid md:grid-cols-3 lg:grid-cols-4 min-[500px]:grid-cols-2">
            {postsRelated.length > 0 &&
              postsRelated.map((item) => (
                <PostRelatedItem key={item.title} post={item} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetailsPage;
