import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { PostCategory, PostFeatureItem } from "module/post";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const HomeFeatureStyle = styled.div`
  .category {
    margin-top: 3rem;
  }
  .grid-layout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3rem;
  }
`;

const HomeFeature = () => {
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
    <HomeFeatureStyle className="container">
      <PostCategory header="Feature" to="/feature-posts" />
      <div className="grid-layout">
        {posts.map((item) => (
          <PostFeatureItem key={item.id} feature={item} />
        ))}
      </div>
    </HomeFeatureStyle>
  );
};

export default HomeFeature;
