import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    posts: [],
    hasMore: false,
    page: 1,
  },
  reducers: {
    addPosts: (state, action) => {
      state.posts.push(...action.payload);
    },
    updatePageNumber: (state) => {
      state.page = state.page + 1;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
  },
});

export const { addPosts, setHasMore, updatePageNumber } = feedSlice.actions;
export default feedSlice.reducer;
