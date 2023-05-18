import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import CategoryHeading from "module/category/CategoryHeading";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const DashboardPage = () => {
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getCategory() {
      const colCate = collection(db, "categories");
      const results = [];
      const data = await getDocs(colCate);
      data.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(results);
    }
    getCategory();
  }, []);
  useEffect(() => {
    async function getUser() {
      const colUser = collection(db, "users");
      const results = [];
      const data = await getDocs(colUser);
      data.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUsers(results);
    }
    getUser();
  }, []);
  useEffect(() => {
    async function getPosts() {
      const colPost = collection(db, "posts");
      const results = [];
      const data = await getDocs(colPost);
      data.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    }
    getPosts();
  }, []);
  return (
    <div>
      <CategoryHeading title="Dashboard" desc="Overview dashboard monitor" />
      <div className="mt-8">
        <Table>
          <thead>
            <tr>
              <th>Number of Categories</th>
              <th>Number of Users</th>
              <th>Number of Posts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-xl font-medium">
                <div className="w-[45px] h-[45px] bg-primary rounded-full text-white flex items-center justify-center">
                  {categories.length}
                </div>
              </td>
              <td className="text-xl font-medium">
                <div className="w-[45px] h-[45px] bg-primary rounded-full text-white flex items-center justify-center">
                  {users.length}
                </div>
              </td>
              <td className="text-xl font-medium">
                <div className="w-[45px] h-[45px] bg-primary rounded-full text-white flex items-center justify-center">
                  {posts.length}
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardPage;
