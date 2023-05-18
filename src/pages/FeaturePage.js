import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { PostRelatedItem } from "module/post";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const FeaturePage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(colRef, where("hot", "==", true), where("status", "==", 1));
    onSnapshot(q, (snapshot) => {
      const postsFeature = [];
      snapshot.forEach((doc) => {
        postsFeature.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      const posts = postsFeature.slice(0, 6);
      setPosts(posts);
    });
  }, []);
  if (posts.length === 0) return null;
  return (
    <div className="container pt-12">
      <div className="mb-10 text-2xl font-bold text-primary">
        All Post Feature
      </div>
      <div className="grid grid-cols-4 gap-x-5 gap-y-7">
        {posts.length > 0 &&
          posts.map((item) => <PostRelatedItem key={item.title} post={item} />)}
      </div>
    </div>
  );
};

export default FeaturePage;
