import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import React, { useEffect, useRef } from "react";
import { BiMenu } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleMenu } from "store/reducers/globalSlice";
import styled from "styled-components";
import logo from "../../assets/images/logo-64.png";
import Menu from "./Menu";

const menuLink = [
  {
    id: 1,
    title: "Home",
    to: "/",
  },
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
    margin-bottom: 20px;
    overflow: hidden;
    &-left {
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
  .dashboard-info,
  .dashboard-button {
    display: none;
  }
  @media only screen and (min-width: 375px) {
    .header {
      &-left {
        gap: 40px;
      }
    }
  }
  @media only screen and (min-width: 768px) {
    .dashboard-info,
    .dashboard-button {
      display: block;
    }
    .dashboard-block {
      display: flex;
      align-items: center;
      gap: 10px;
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
  const dispatch = useDispatch();
  const showOption = useSelector((state) => state.global.toggleMenu);
  const menuRef = useRef();
  // Click outside
  useEffect(() => {
    function handleClickOutSide(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        dispatch(toggleMenu(false));
      }
    }
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.addEventListener("click", handleClickOutSide);
    };
  }, [dispatch]);
  return (
    <HeaderStyle className="container">
      <div className="header" ref={menuRef}>
        <div className="header-left">
          <NavLink to="/">
            <img src={logo} alt="logo" className="header-logo" />
          </NavLink>
          <div className="flex items-center gap-5 min-[414px]:gap-8 min-[1440px]:gap-12">
            {menuLink.map((item) => (
              <NavLink key={item.id} to={item.to} className="header-item">
                {item.title}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="header-right">
          {!userInfo ? (
            <div className="hidden md:inline-block">
              <Button
                width="150px"
                height="46px"
                padding="12px 30px"
                size="14px"
                to="/sign-up"
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <div className="dashboard-block">
              <div className="dashboard-info px-5 py-2 border border-secondary rounded-[8px]">
                <span className="text-lg text-primary">Welcome, </span>
                <span className="text-base font-medium text-third">
                  {getLastName(userInfo.displayName)}
                </span>
              </div>
              <div className="dashboard-button">
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
            </div>
          )}
          <div className="md:hidden">
            <BiMenu
              size={25}
              color="#2c3e50"
              className="cursor-pointer"
              onClick={() => dispatch(toggleMenu(!showOption))}
            />
          </div>
        </div>
        {/* Show / Hidden => Menu */}
        <Menu />
      </div>
    </HeaderStyle>
  );
};
export default Header;
