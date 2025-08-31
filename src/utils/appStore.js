import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import chatSlice from "./ChatSlice";
import commentsSlice from "./commentsSlice";
import videoSlice from "./videoSlice";
import popularVideosSlice from "./popularVideosSlice";
import jokeSlice from "./jokeSlice";
const appStore = configureStore({
  reducer: {
    app: appSlice,
    search: searchSlice,
    chat: chatSlice,
    comments: commentsSlice,
    video: videoSlice,
    popularVideos: popularVideosSlice,
    joke: jokeSlice,
  },
});
export default appStore;
