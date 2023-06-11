import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { PostRelatedItem } from "module/post";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AuthorPage = () => {
  const params = useParams();
  const { slug } = params;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPostsWithAuthor() {
      const colRef = collection(db, "posts");
      const q = query(colRef, where("user.username", "==", slug));
      onSnapshot(q, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
    getPostsWithAuthor();
  }, [slug]);

  return (
    <div className="container">
      <div className="mb-10 text-2xl font-bold text-primary">
        {`Author : ${slug}`}
      </div>
      <div className="block mb-5 gap-x-5 gap-y-7 md:grid md:grid-cols-2 lg:grid-cols-3 min-[1440px]:grid-cols-4">
        {posts.length > 0 &&
          posts.map((item) => (
            <div className="flex flex-col mb-5 md:mb-0">
              <PostRelatedItem key={item.title} post={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AuthorPage;
