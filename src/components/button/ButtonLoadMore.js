import React from "react";

const ButtonLoadMore = ({ handleLoadmore }) => {
  return (
    <button
      className="block px-5 py-2 mx-auto mt-5 font-medium transition-all duration-200 ease-linear bg-white border border-secondary text-primary hover:opacity-80"
      onClick={handleLoadmore}
    >
      Load More
    </button>
  );
};

export default ButtonLoadMore;
