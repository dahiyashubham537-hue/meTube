import React from "react";

const Comment = ({ data }) => {
  const { name, text } = data;

  return (
    <div className="flex items-start space-x-2">
      {/* User avatar placeholder */}
      <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />

      <div>
        <p className="text-sm font-semibold text-gray-800">{name}</p>
        <p className="text-sm text-gray-700">{text}</p>
      </div>
    </div>
  );
};

export default Comment;
