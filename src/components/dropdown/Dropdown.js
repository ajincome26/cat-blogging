import React from "react";
import { DropdownProvider } from "./dropdown-context";

const Dropdown = ({ children, className }) => {
  return (
    <DropdownProvider>
      <div className={`relative w-full ${className}`}>{children}</div>
    </DropdownProvider>
  );
};

export default Dropdown;
