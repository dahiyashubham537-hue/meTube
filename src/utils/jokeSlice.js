import { createSlice } from "@reduxjs/toolkit";
const jokeSlice = createSlice({
  name: "joke",
  initialState: {
    isOpen: false,
    joke: null,
    position: "right",
  },
  reducers: {
    showJoke: (state, action) => {
      state.isOpen = !state.isOpen;
      state.joke = action.payload.joke;
      state.position = action.payload.position;
    },
    hideJoke: (state) => {
      state.isOpen = false;
      state.joke = null;
    },
  },
});
export default jokeSlice.reducer;
export const { showJoke, hideJoke } = jokeSlice.actions;
