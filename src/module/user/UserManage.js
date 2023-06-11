import Swal from "sweetalert2";
import React from "react";
import CategoryHeading from "module/category/CategoryHeading";
import { useState } from "react";
import { userRole, userStatus } from "utils/constants";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Table } from "components/table";
import { LabelStatus } from "components/label";
import { InputSearch } from "components/input";
import { InfinitySpin } from "react-loader-spinner";
import { debounce } from "lodash";
import { db } from "firebase-app/firebase-config";
import { ButtonDiv, ButtonLoadMore } from "components/button";
import { ActionDelete, ActionEdit } from "components/action";
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

const USER_PER_PAGE = 5;

const UserManage = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(0);
  const [lastDoc, setLastDoc] = useState("");

  useEffect(() => {
    document.title = "Cat Manage User";
  }, []);

  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="danger">Rejected</LabelStatus>;

      default:
        break;
    }
  };
  const renderLabelRole = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Moderator";
      case userRole.USER:
        return "User";

      default:
        break;
    }
  };

  const handleUpdateUser = (userId) => {
    navigate(`/manage/update-user?id=${userId}`);
  };

  const handleDeleteUser = async (userId) => {
    const docRef = doc(db, "users", userId);
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
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    });
  };

  // SEARCH
  const handleFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);
  useEffect(() => {
    async function getUser() {
      const colRef = collection(db, "users");
      const newRef = filter
        ? query(
            colRef,
            where("fullname", ">=", filter),
            where("fullname", "<=", filter + "utf8")
          )
        : query(colRef, limit(USER_PER_PAGE));

      // Loadmore
      const docSnaps = await getDocs(newRef);
      const lastVisible = docSnaps.docs[docSnaps.docs.length - 1];
      setLastDoc(lastVisible);

      // Xử lý ẩn hiện Button cho hợp lý
      onSnapshot(colRef, (snapshot) => {
        setSize(snapshot.size);
      });

      // Display user theo query
      onSnapshot(newRef, (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUserList(result);
      });
    }
    getUser();
  }, [filter]);

  // Load More
  const handleLoadmore = async () => {
    setLoading(true);
    const nextRef = query(
      collection(db, "users"),
      startAfter(lastDoc),
      limit(USER_PER_PAGE)
    );

    const docSnaps = await getDocs(nextRef);
    const lastVisible = docSnaps.docs[docSnaps.docs.length - 1];
    setLastDoc(lastVisible);

    // Display user ban đầu + user load thêm !
    onSnapshot(nextRef, (snapshot) => {
      const result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList([...userList, ...result]);
      setLoading(false);
    });
  };

  return (
    <>
      <div className="items-center justify-between block md:flex">
        <CategoryHeading title="Users" desc="Manage all users of the system" />
        <div className="mt-8 text-right md:mt-0">
          <ButtonDiv
            to="/manage/add-user"
            className="inline-block hover:opacity-80"
            bgColor="#4ade80"
            textColor="#14532d"
            weight="600"
          >
            Create User
          </ButtonDiv>
        </div>
      </div>
      <InputSearch
        handleFilter={handleFilter}
        placeholder="Search user ..."
        className="my-[2rem]"
      />
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email Address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((item) => (
              <tr key={item.id}>
                <td title={item.id}>{item.id.slice(0, 5) + "..."}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt="avatar"
                      className="flex-shrink-0 object-cover w-10 h-10 rounded-sm"
                    />
                    <div className="flex flex-col">
                      <h3>{item.fullname}</h3>
                      <span className="text-sm font-light text-grayField">
                        {new Date(
                          item.createdAt.seconds * 1000
                        ).toLocaleDateString("vi-VI")}
                      </span>
                    </div>
                  </div>
                </td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{renderLabelStatus(Number(item.status))}</td>
                <td>{renderLabelRole(Number(item.role))}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <ActionEdit onClick={() => handleUpdateUser(item.id)} />
                    <ActionDelete onClick={() => handleDeleteUser(item.id)} />
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
      {!loading && userList.length < size && (
        <ButtonLoadMore handleLoadmore={handleLoadmore} />
      )}
    </>
  );
};

export default UserManage;
