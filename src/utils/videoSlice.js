import { createSlice } from "@reduxjs/toolkit";
const videoSlice = createSlice({
  name: "video",
  initialState: {
    id: "",
    tags: [],
    channelName: "",
    videoTitle: "",
    viewCount: "",
  },
  reducers: {
    setVideo: (state, action) => {
      const video = action.payload;
      state.id = video.id;
      state.videoTitle = video.snippet?.title || "";
      state.channelName = video.snippet?.channelTitle || "";
      state.tags = video.snippet?.tags || [];
      state.viewCount = video.statistics.viewCount || "";
    },

    removeVideo: (state, action) => {
      state.id = "";
      state.videoTitle = "";
      state.channelName = "";
      state.tags = [];
      state.viewCount = "";
    },
  },
});
export default videoSlice.reducer;
export const { setVideo, removeVideo } = videoSlice.actions;
