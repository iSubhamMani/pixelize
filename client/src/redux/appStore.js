import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import postSlice from "./slices/postSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
  },
});

export default appStore;
