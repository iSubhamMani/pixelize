import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    likedPosts: {},
    cachedPosts: {},
    likeCount: {},
  },
  reducers: {
    addLikedPosts: (state, action) => {
      state.likedPosts = { ...state.likedPosts, ...action.payload };
    },
    deleteLikedPosts: (state, action) => {
      delete state.likedPosts[action.payload];
    },
    addCachedPosts: (state, action) => {
      state.cachedPosts = { ...state.cachedPosts, ...action.payload };
    },
    setPostLikesCount: (state, action) => {
      state.likeCount = { ...state.likeCount, ...action.payload };
    },
  },
});

export const {
  addLikedPosts,
  deleteLikedPosts,
  addCachedPosts,
  setPostLikesCount,
} = postSlice.actions;
export default postSlice.reducer;
