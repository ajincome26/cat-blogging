import React from "react";

const InputSearch = ({ className, placeholder, handleFilter }) => {
  return (
    <div className={`${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="block h-full px-5 py-2 ml-auto transition-all duration-200 ease-linear border border-transparent rounded-lg outline-none focus:border-secondary"
        onChange={handleFilter}
      />
    </div>
  );
};

export default InputSearch;
