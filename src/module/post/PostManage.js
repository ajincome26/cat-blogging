import Swal from "sweetalert2";
import React from "react";
import CategoryHeading from "module/category/CategoryHeading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Table } from "components/table";
import { InputSearch } from "components/input";
import { InfinitySpin } from "react-loader-spinner";
import { Dropdown, List, Select } from "components/dropdown";
import { debounce } from "lodash";
import { db } from "firebase-app/firebase-config";
import { ButtonLoadMore } from "components/button";
import { ActionDelete, ActionEdit, ActionView } from "components/action";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { formatDateV2, listStatus } from "utils/constants";
import { LabelStatus } from "components/label";

const POST_PER_PAGE = 5;

const PostManage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState("");
  const [size, setSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const { setValue } = useForm({ mode: "onChange" });

  useEffect(() => {
    document.title = "Cat Manage Post";
  }, []);

  useEffect(() => {
    async function getAllPosts() {
      const colRef = collection(db, "posts");
      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));

      const docSnaps = await getDocs(newRef);
      const lastVisible = docSnaps.docs[docSnaps.docs.length - 1];
      setLastDoc(lastVisible);

      // Xử lý ẩn hiện Button cho hợp lý
      onSnapshot(colRef, (snapshot) => {
        setSize(snapshot.size);
      });

      onSnapshot(newRef, (snapshot) => {
        const posts = [];
        snapshot.forEach((doc) => {
          posts.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(posts);
      });
    }
    getAllPosts();
  }, [filter]);

  const handleFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);

  const handleLoadmore = async () => {
    setLoading(true);
    const nextRef = query(
      collection(db, "posts"),
      startAfter(lastDoc),
      limit(POST_PER_PAGE)
    );

    const docSnaps = await getDocs(nextRef);
    const lastVisible = docSnaps.docs[docSnaps.docs.length - 1];
    setLastDoc(lastVisible);

    onSnapshot(nextRef, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts([...posts, ...result]);
      setLoading(false);
    });
  };

  const handleViewPost = (post) => {
    navigate(`/posts/${post.slug}/${post.id}`);
  };

  const handleUpdatePost = (postId) => {
    navigate(`/manage/update-post?id=${postId}`);
  };

  const handleDeletePost = async (postId) => {
    try {
      const docRef = doc(db, "posts", postId);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(docRef);
          Swal.fire("Deleted!", "Post has been deleted.", "success");
        }
      });
    } catch (error) {
      toast.error("Delete post failed");
    }
  };

  const renderLabelStatus = (status) => {
    switch (status) {
      case listStatus.APPROVED:
        return <LabelStatus type="success">Approved</LabelStatus>;
      case listStatus.PENDING:
        return <LabelStatus type="warning">.Pending</LabelStatus>;
      case listStatus.REJECT:
        return <LabelStatus type="danger">Rejected</LabelStatus>;

      default:
        break;
    }
  };

  return (
    <>
      <CategoryHeading title="Posts" desc="Manage all posts of the system" />
      <div className="flex items-center gap-2 my-[2rem] flex-row-reverse">
        <InputSearch
          handleFilter={handleFilter}
          placeholder="Search post ..."
          className="h-[48px]"
        />
        <Dropdown className="max-w-[200px] min-[315px]:hidden min-[414px]:inline-block">
          <Select
            label="Category"
            bgSelect="bg-white"
            labelClass="text-[#a4afbf] font-normal"
          />
          <List setValue={setValue} name="categoryId">
            {/* {categories.map((item) => (
                  <Option
                    key={item.id}
                    handleClickOption={handleClickOption}
                    item={item}
                  />
                ))} */}
          </List>
        </Dropdown>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 &&
            posts.map((item) => (
              <tr key={item.id}>
                <td title={item.id}>{item.id.slice(0, 5) + "..."}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-[90px] h-[80px] rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.url}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2
                        className="font-semibold whitespace-pre-wrap text-primary truncate-3"
                        title={item.title}
                      >
                        {item.title}
                      </h2>
                      <h3 className="text-sm opacity-50">
                        {formatDateV2(item.createdAt.seconds)}
                      </h3>
                    </div>
                  </div>
                </td>
                <td>{item.category.name}</td>
                <td>{item.user.username}</td>
                <td>{renderLabelStatus(Number(item.status))}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <ActionView onClick={() => handleViewPost(item)} />
                    <ActionEdit onClick={() => handleUpdatePost(item.id)} />
                    <ActionDelete onClick={() => handleDeletePost(item.id)} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {loading && (
        <div className="flex items-center justify-center mt-5">
          <InfinitySpin width="150" color="#2c3e50" />
        </div>
      )}
      {/* categoryList.length < size */}
      {!loading && posts.length < size && (
        <ButtonLoadMore handleLoadmore={handleLoadmore} />
      )}
    </>
  );
};

export default PostManage;
