import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
  },
  reducers: {
    addPosts: (state, action) => {
      state.posts.push(...action.payload);
    },
  },
});

export const { addPosts } = postSlice.actions;
export default postSlice.reducer;
