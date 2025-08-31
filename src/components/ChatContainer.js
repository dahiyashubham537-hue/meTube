import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/ChatSlice";
import { generateRandomComment, generateRandomName } from "../utils/constants";

const ChatContainer = () => {
  const polledMessages = useSelector((store) => store.chat.messages);
  const dispatch = useDispatch();
  const [liveMessage, setLiveMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!liveMessage.trim()) return;

    dispatch(
      addMessage({
        name: "defaultUser",
        message: liveMessage,
      })
    );
    setLiveMessage("");
  };

  useEffect(() => {
    const i = setInterval(() => {
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: generateRandomComment(),
        })
      );
    }, 2000);
    return () => clearInterval(i);
  }, [dispatch]);

  return (
    <div className="w-[400px] mt-12 max-h-[32rem] flex flex-col border border-gray-300 rounded-lg bg-white">
      {/* Chat messages */}
      <div className="flex-1 max-h-[90%] overflow-y-auto p-2 bg-[#f9f9f9]">
        {polledMessages.map((p, idx) => (
          <ChatMessage key={idx} name={p.name} message={p.message} />
        ))}
      </div>

      {/* Input box */}
      <form
        className="flex border-t border-gray-300 p-2"
        onSubmit={handleSubmit}
      >
        <input
          className="flex-1 px-3 py-1 border border-gray-300 rounded-l text-sm focus:outline-none"
          type="text"
          placeholder="Say something..."
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
        />
        <button className="px-4 py-1 bg-blue-600 text-white text-sm rounded-r">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatContainer;
