import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import feedSlice from "./slices/feedSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
  },
});

export default appStore;
