import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import feedSlice from "./slices/feedSlice";
import profileSlice from "./slices/profileSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
    profile: profileSlice,
  },
});

export default appStore;
