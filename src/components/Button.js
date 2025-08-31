import React from "react";

const Button = ({ name }) => {
  return (
    <div>
      <button className="bg-gray-200 px-3 py-1 rounded-md">{name}</button>
    </div>
  );
};

export default Button;
