import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    posts: [],
    page: 1,
    hasMore: false,
  },
  reducers: {
    addPosts: (state, action) => {
      state.posts.push(...action.payload);
    },
    removeAllPosts: (state) => {
      state.posts = [];
    },
    updatePageNumber: (state) => {
      state.page += 1;
    },
    setPageNumber: (state, action) => {
      state.page = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
  },
});

export const {
  addPosts,
  updatePageNumber,
  setHasMore,
  removeAllPosts,
  setPageNumber,
} = profileSlice.actions;
export default profileSlice.reducer;
