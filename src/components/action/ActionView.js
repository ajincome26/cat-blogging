import React from "react";
import { AiOutlineEye } from "react-icons/ai";

const ActionView = ({ onClick = () => {} }) => {
  return (
    <div
      className="p-2 border-[2px] border-[#ccc] rounded-md cursor-pointer"
      onClick={onClick}
    >
      <AiOutlineEye />
    </div>
  );
};

export default ActionView;
