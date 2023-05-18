import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { PostRelatedItem } from "module/post";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const params = useParams();
  const { slug } = params;
  const [posts, setPosts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    async function getPostsWithCategory() {
      const colRef = collection(db, "posts");
      const q = query(colRef, where("category.slug", "==", slug));
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
    getPostsWithCategory();
  }, [slug]);

  useEffect(() => {
    async function getCategoryName() {
      const q = query(collection(db, "categories"), where("slug", "==", slug));
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          const result = [];
          result.push({
            id: doc.id,
            ...doc.data(),
          });
          const categoryName = result[0].name;
          setCategoryName(categoryName);
        });
      });
    }
    getCategoryName();
  }, [slug]);

  if (!categoryName) return null;
  return (
    <div className="container pt-12">
      <div className="mb-10 text-2xl font-bold text-primary">
        {`Category : ${categoryName}`}
      </div>
      <div className="grid grid-cols-4 gap-x-5 gap-y-7">
        {posts.length > 0 &&
          posts.map((item) => <PostRelatedItem key={item.title} post={item} />)}
      </div>
    </div>
  );
};

export default CategoryPage;
