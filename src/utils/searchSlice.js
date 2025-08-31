import reducer from "./appSlice";
import { createSlice } from "@reduxjs/toolkit";
const loadCache = () => {
  try {
    const stored = localStorage.getItem("cache");
    if (!stored || stored === "undefined" || stored === "null") return {};
    return JSON.parse(stored);
  } catch {
    return {};
  }
};
const loadSearchResults = () => {
  try {
    const stored = localStorage.getItem("searchResults");
    if (!stored || stored === "undefined" || stored === "null") return {};
    return JSON.parse(stored);
  } catch {
    return {};
  }
};
const saveCache = (cache) => {
  try {
    localStorage.setItem("cache", JSON.stringify(cache));
  } catch {}
};
const saveSearchResults = (searchResults) => {
  try {
    localStorage.setItem("searchResults", JSON.stringify(searchResults));
  } catch {}
};
const initialState = {
  cache: loadCache() || {},
  searchResults: loadSearchResults() || {},
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    cacheResults: (state, action) => {
      const search_query = Object.keys(action.payload)[0];
      const cache = action.payload[search_query];
      state.cache = {
        ...state.cache,
        [search_query]: cache,
      };
      saveCache(state.cache);
    },
    setSearchResults: (state, action) => {
      const search_query = Object.keys(action.payload)[0];
      const videos = action.payload[search_query];

      // always keep it as an object
      state.searchResults = {
        ...state.searchResults,
        [search_query]: videos,
      };

      saveSearchResults(state.searchResults);
    },
  },
});
export default searchSlice.reducer;
export const { cacheResults, setSearchResults } = searchSlice.actions;
