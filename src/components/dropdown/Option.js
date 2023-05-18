import React from "react";

const Option = ({ item, handleClickOption }) => {
  return (
    <div
      className="p-3 cursor-pointer text-primary hover:bg-secondary hover:text-white"
      onClick={handleClickOption}
      data-id={item.id}
      data-name={item.name}
      data-slug={item.slug}
      data-status={item.status}
    >
      {item.name}
    </div>
  );
};

export default Option;
