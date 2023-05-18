import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const ActionDelete = ({ onClick = () => {} }) => {
  return (
    <div
      className="p-2 border-[2px] border-[#ccc] rounded-md cursor-pointer"
      onClick={onClick}
    >
      <RiDeleteBinLine />
    </div>
  );
};

export default ActionDelete;
