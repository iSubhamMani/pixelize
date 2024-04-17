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
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
});

export const { addPosts, removeAllPosts, deletePost } = profileSlice.actions;
export default profileSlice.reducer;
