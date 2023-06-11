import { ActionDelete, ActionEdit } from "components/action";
import { ButtonDiv, ButtonLoadMore } from "components/button";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
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
import React, { useEffect, useState } from "react";
import { listStatusCate } from "utils/constants";
import CategoryHeading from "./CategoryHeading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { InfinitySpin } from "react-loader-spinner";
import { InputSearch } from "components/input";

const CATEGORY_PER_PAGE = 5;

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState("");
  const [size, setSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cat Manage Category";
  }, []);

  const handleDeleteCategory = (categoryId) => {
    const docRef = doc(db, "categories", categoryId);
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
        Swal.fire("Deleted!", "Category has been deleted.", "success");
      }
    });
  };

  const handleUpdateCategory = (categoryId) => {
    navigate(`/manage/update-category?id=${categoryId}`);
  };

  const handleFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);

  useEffect(() => {
    async function getCategory() {
      const colRef = collection(db, "categories");
      const newRef = filter
        ? query(
            colRef,
            where("name", ">=", filter),
            where("name", "<=", filter + "utf8")
          )
        : query(colRef, limit(CATEGORY_PER_PAGE));

      const docSnaps = await getDocs(newRef);
      const lastVisible = docSnaps.docs[docSnaps.docs.length - 1];
      setLastDoc(lastVisible);

      // Xử lý ẩn hiện Button cho hợp lý
      onSnapshot(colRef, (snapshot) => {
        setSize(snapshot.size);
      });

      onSnapshot(newRef, (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategoryList(result);
      });
    }
    getCategory();
  }, [filter]);

  const handleLoadmore = async () => {
    setLoading(true);
    const nextRef = query(
      collection(db, "categories"),
      startAfter(lastDoc),
      limit(CATEGORY_PER_PAGE)
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
      setCategoryList([...categoryList, ...result]);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="items-center justify-between block md:flex">
        <CategoryHeading title="Categories" desc="Manage your category" />
        <div className="mt-8 text-right md:mt-0">
          <ButtonDiv
            to="/manage/add-category"
            className="inline-block hover:opacity-80"
            bgColor="#4ade80"
            textColor="#14532d"
            weight="600"
          >
            Create Category
          </ButtonDiv>
        </div>
      </div>
      <InputSearch
        handleFilter={handleFilter}
        placeholder="Search category ..."
        className="my-[2rem]"
      />
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td className="italic text-grayDark">{item.slug}</td>
                <td>
                  {Number(item.status) === listStatusCate.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {Number(item.status) === listStatusCate.UNAPPROVED && (
                    <LabelStatus type="warning">Unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <ActionEdit onClick={() => handleUpdateCategory(item.id)} />
                    <ActionDelete
                      onClick={() => handleDeleteCategory(item.id)}
                    />
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
      {!loading && categoryList.length < size && (
        <ButtonLoadMore handleLoadmore={handleLoadmore} />
      )}
    </>
  );
};

export default CategoryManage;
