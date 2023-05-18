import React from "react";

const CategoryHeading = ({ title, desc }) => {
  return (
    <div className="category-heading">
      <h1 className="heading-h1">{title}</h1>
      <h3 className="heading-h3">{desc}</h3>
    </div>
  );
};

export default CategoryHeading;
