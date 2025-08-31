import React from "react";

const ChatMessage = ({ name, message }) => {
  return (
    <div className="flex items-start space-x-2 py-1 px-2 hover:bg-gray-100 rounded">
      {/* Avatar */}
      <img
        className="h-6 w-6 rounded-full"
        src="https://tse4.mm.bing.net/th/id/OIP.Ln_qrnMeEWlR-sIzaHn2fAHaHa"
        alt="avatar"
      />
      {/* Name + Message */}
      <div>
        <span className="font-semibold text-xs text-gray-800 mr-2">{name}</span>
        <span className="text-sm text-gray-700">{message}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
