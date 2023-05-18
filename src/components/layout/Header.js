import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/logo-64.png";

const menuLink = [
  {
    id: 1,
    title: "Home",
    to: "/",
  },
  // {
  //   id: 2,
  //   title: "Blog",
  //   to: "/blog",
  // },
  {
    id: 3,
    title: "Contact",
    to: "/contact",
  },
];

const HeaderStyle = styled.header`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-left {
      display: flex;
      align-items: center;
      gap: 40px;
    }
    &-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    &-logo {
      margin-right: 10px;
      width: 65%;
      cursor: pointer;
    }
    &-item {
      color: ${(props) => props.theme.secondary};
      font-weight: 600;
      &.active {
        color: ${(props) => props.theme.primary};
      }
    }
  }
`;

// Hàm last name
const getLastName = (name = "Anonymous") => {
  const lengthName = name?.split(" ").length;
  return name?.split(" ")[lengthName - 1];
};

const Header = () => {
  const { userInfo } = useAuth();
  return (
    <HeaderStyle className="container">
      <div className="header">
        <div className="header-left">
          <NavLink to="/">
            <img src={logo} alt="logo" className="header-logo" />
          </NavLink>
          {menuLink.map((item) => (
            <NavLink key={item.id} to={item.to} className="header-item">
              {item.title}
            </NavLink>
          ))}
        </div>
        <div className="header-right">
          {!userInfo ? (
            <Button
              width="150px"
              height="46px"
              padding="12px 30px"
              size="14px"
              to="/sign-up"
            >
              Sign Up
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="px-5 py-2 border border-secondary rounded-[8px]">
                <span className="text-lg font-medium text-primary">
                  Welcome,{" "}
                </span>
                <span className="text-xl font-medium text-third">
                  {getLastName(userInfo.displayName)}
                </span>
              </div>
              <Button
                to="/dashboard"
                width="150px"
                height="48px"
                size="14px"
                padding="12px 30px"
              >
                Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </HeaderStyle>
  );
};

export default Header;
