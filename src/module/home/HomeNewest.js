import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import {
  PostCategory,
  PostNewestItem,
  PostNewestLarge,
  PostRelated,
} from "module/post";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const HomeNewestStyle = styled.div`
  margin-top: 3rem;
  .newest {
    display: flex;
    align-items: stretch;
    gap: 2rem;
    &-right {
      flex-basis: 50%;
    }
    &-right {
      padding: 20px;
      background-color: ${(props) => props.theme.fourth};
      border-radius: 10px;
      height: 100%;
    }
    &-item {
      &:last-child {
        border-color: transparent;
        margin-bottom: 0;
        padding-bottom: 0;
      }
    }
  }
  .post-title {
    color: ${(props) => props.theme.primary};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }
  .post-meta {
    color: ${(props) => props.theme.secondary};
  }
  .post-topic {
    cursor: pointer;
  }
`;

const HomeNewest = () => {
  const [newestSmall, setNewestSmall] = useState([]);
  const [newestLarge, setNewestLarge] = useState([]);
  const [realted, setRelated] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(
      colRef,
      where("hot", "==", false),
      where("status", "==", 1)
    );
    onSnapshot(q, (snapshot) => {
      const postsNewest = [];
      snapshot.forEach((doc) => {
        postsNewest.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      const [newestLarge, ...rest] = postsNewest;
      const newestSmall = rest.slice(0, 3);
      const related = rest.slice(3, 7);
      setNewestLarge(newestLarge);
      setNewestSmall(newestSmall);
      setRelated(related);
    });
  }, []);
  if (newestSmall?.length === 0 && newestLarge?.length === 0) return null;

  return (
    <HomeNewestStyle className="container">
      <PostCategory header="Newest Update" to="/newest-posts" />
      <div className="newest">
        <PostNewestLarge data={newestLarge} />
        <div className="newest-right">
          {newestSmall.map((item) => (
            <PostNewestItem key={item.id} data={item} />
          ))}
        </div>
      </div>
      <PostRelated data={realted} />
    </HomeNewestStyle>
  );
};

export default HomeNewest;
