import React from "react";
import { useDropdown } from "./dropdown-context";

const List = ({ children }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div className="absolute left-0 z-10 w-full overflow-auto bg-white rounded-md top-full max-h-40">
          {children}
        </div>
      )}
    </>
  );
};

export default List;
