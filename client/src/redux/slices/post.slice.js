import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    likedPosts: {},
    cachedPosts: {},
    profileCachedPosts: {},
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
    addProfileCachedPosts: (state, action) => {
      state.profileCachedPosts = {
        ...state.profileCachedPosts,
        ...action.payload,
      };
    },
    removeProfileCachedPosts: (state) => {
      state.profileCachedPosts = {};
    },
    deleteProfileCachedPost: (state, action) => {
      delete state.profileCachedPosts[action.payload];
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
  addProfileCachedPosts,
  removeProfileCachedPosts,
  deleteProfileCachedPost,
} = postSlice.actions;
export default postSlice.reducer;
