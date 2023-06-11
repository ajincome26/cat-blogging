import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import React from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { icons } from "utils/icons";

const { RxDashboard, BsBook, MdOutlineTopic, FiUsers, BiLogOut } = icons;

const listSidebar = [
  {
    id: 1,
    title: "Dashboard",
    icon: <RxDashboard />,
    to: "/dashboard",
  },
  {
    id: 2,
    title: "Post",
    icon: <BsBook />,
    to: "/manage/posts",
  },
  {
    id: 3,
    title: "Category",
    icon: <MdOutlineTopic />,
    to: "/manage/categories",
  },
  {
    id: 4,
    title: "User",
    icon: <FiUsers />,
    to: "/manage/user",
  },
  {
    id: 5,
    title: "Logout",
    icon: <BiLogOut />,
    to: "/sign-up",
    onClick: () => {
      signOut(auth);
      toast.success("Logout Successfully");
    },
  },
];

const SidebarStyle = styled.div`
  width: 300px;
  height: 100%;
  padding: 2rem 0;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  color: ${(props) => props.theme.grayDark};
  flex-shrink: 0;
  .sidebar {
    &-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0 2rem;
    }
    &-heading {
      color: ${(props) => props.theme.primary};
      font-size: 20px;
      font-weight: 600;
    }
    &-content {
      margin-top: 2rem;
    }
    &-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 1rem 2rem;
      cursor: pointer;
      font-size: 18px;
      font-weight: 500;
      transition: all 0.2s ease;
      &:last-child {
        margin-bottom: 0;
      }
      &:hover {
        color: ${(props) => props.theme.secondary};
      }
      &.active {
        color: ${(props) => props.theme.secondary};
        background-color: #ccd0d7;
      }
    }
  }
  @media (min-width: 375px) {
    width: 100%;
    .sidebar {
      &-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 0 2rem;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      }
      &-content {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 15px;
      }
      &-item {
        padding: 1rem;
      }
    }
  }
  @media (min-width: 768px) {
    width: 100%;
    .sidebar {
      &-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0 2rem;
        box-shadow: none;
      }
      &-content {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 15px;
      }
      &-item {
        padding: 1rem;
      }
    }
  }
  @media (min-width: 1280px) {
    width: 300px;
    .sidebar {
      &-header {
        justify-content: left;
      }
      &-content {
        display: block;
        gap: 15px;
      }
      &-item {
        padding: 1rem;
      }
    }
  }
`;

const Sidebar = () => {
  return (
    <SidebarStyle className="sidebar">
      <div className="sidebar-header">
        <NavLink to="/">
          <img srcSet="/logo-64.png" alt="cat-blogging" className="logo" />
        </NavLink>
        <h1 className="sidebar-heading">Cat Blogging</h1>
      </div>
      <div className="sidebar-content">
        {listSidebar.map((item) => (
          <NavLink
            to={item.to}
            key={item.id}
            className="sidebar-item"
            onClick={item?.onClick}
          >
            {item.icon}
            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>
    </SidebarStyle>
  );
};

export default Sidebar;
