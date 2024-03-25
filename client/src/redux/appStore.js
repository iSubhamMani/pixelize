import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default appStore;
