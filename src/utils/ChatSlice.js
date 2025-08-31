import { createSlice } from "@reduxjs/toolkit";
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      if (state.messages.length > 12) {
        state.messages.shift(); // remove oldest
      }
    },
  },
});
export default chatSlice.reducer;
export const { addMessage } = chatSlice.actions;
