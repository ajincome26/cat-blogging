import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { useSelector } from "react-redux";

const getLastName = (name = "Anonymous") => {
  const lengthName = name?.split(" ").length;
  return name?.split(" ")[lengthName - 1];
};
const Menu = () => {
  const { userInfo } = useAuth();
  const showOption = useSelector((state) => state.global.toggleMenu);

  return (
    <div
      className={`menu w-2/3 h-[150px] bg-slate-100 absolute top-[88px] right-0 shadow-lg transition-all items-center flex justify-center z-10 ${
        showOption ? "" : "translate-x-[100%]"
      }`}
    >
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
        <div className="dashboard-block">
          <div className="px-5 py-2 shadow-lg rounded-[8px] text-center">
            <span className="text-lg text-primary">Welcome, </span>
            <span className="text-base font-medium text-third">
              {getLastName(userInfo.displayName)}
            </span>
          </div>
          <div className="flex justify-center mt-5">
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
    </div>
  );
};

export default Menu;
