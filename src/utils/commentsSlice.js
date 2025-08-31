import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const loadComments = () => {
  try {
    const stored = localStorage.getItem("comments");
    if (!stored || stored === "undefined" || stored === "null") return {};
    return JSON.parse(stored);
  } catch {
    return {};
  }
};

// Save to localStorage
const saveComments = (commentsByVideo) => {
  try {
    localStorage.setItem("comments", JSON.stringify(commentsByVideo));
  } catch {}
};

const initialState = {
  commentsByVideo: loadComments(),
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    cacheComments: (state, action) => {
      const videoId = Object.keys(action.payload)[0];
      state.commentsByVideo[videoId] = action.payload[videoId];
      saveComments(state.commentsByVideo); // centralised persistence
    },
    clearComments: (state) => {
      state.commentsByVideo = {};
      saveComments({});
    },
  },
});

export const { cacheComments, clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;
