import React from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useDropdown } from "./dropdown-context";

const Select = ({ label, labelClass, bgSelect }) => {
  const { show, setShow, nodeRef } = useDropdown();
  return (
    <div
      className={`flex items-center justify-between w-full p-3 rounded-md cursor-pointer ${
        bgSelect || "bg-grayField"
      }`}
      ref={nodeRef}
      onClick={() => setShow(!show)}
    >
      <span className={`font-medium ${labelClass || "text-grayDark"}`}>
        {label}
      </span>
      {show ? (
        <AiFillCaretUp color="#2c3e50" />
      ) : (
        <AiFillCaretDown color="#2c3e50" />
      )}
    </div>
  );
};

export default Select;
