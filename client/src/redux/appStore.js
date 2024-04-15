import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import feedSlice from "./slices/feedSlice";
import profileSlice from "./slices/profileSlice";
import searchSlice from "./slices/searchSlice";
import postSlice from "./slices/post.slice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
    profile: profileSlice,
    search: searchSlice,
    post: postSlice,
  },
});

export default appStore;
