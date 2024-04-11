import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    posts: [],
  },
  reducers: {
    addPosts: (state, action) => {
      state.posts.push(...action.payload);
    },
    removeAllPosts: (state) => {
      state.posts = [];
    },
  },
});

export const { addPosts, removeAllPosts } = profileSlice.actions;
export default profileSlice.reducer;
