import { createSlice } from "@reduxjs/toolkit";
const loadVideos = () => {
  try {
    const stored = localStorage.getItem("videos");
    if (!stored || stored === "undefined" || stored === "null") return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

// Save to localStorage
const saveVideos = (videos) => {
  try {
    localStorage.setItem("videos", JSON.stringify(videos));
  } catch {}
};
const initialState = {
  videos: loadVideos(),
};

const popularVideosSlice = createSlice({
  name: "popularVideos",
  initialState,
  reducers: {
    addVideos: (state, action) => {
      state.videos = action.payload;
      saveVideos(state.videos);
    },
  },
});
export default popularVideosSlice.reducer;
export const { addVideos } = popularVideosSlice.actions;
