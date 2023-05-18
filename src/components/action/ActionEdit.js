import React from "react";
import { FiEdit } from "react-icons/fi";

const ActionEdit = ({ onClick = () => {} }) => {
  return (
    <div
      className="p-2 border-[2px] border-[#ccc] rounded-md cursor-pointer"
      onClick={onClick}
    >
      <FiEdit />
    </div>
  );
};

export default ActionEdit;
