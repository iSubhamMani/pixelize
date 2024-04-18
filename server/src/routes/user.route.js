import { Router } from "express";
import {
  getCurrentUser,
  getUserByUsername,
  loginUser,
  logoutUser,
  registerUser,
  renewToken,
  updateUserProfilePicture,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.route("/test").get((req, res) => {
  res.send("Hello from user route");
});
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyToken, logoutUser);
userRouter.route("/current-user").get(verifyToken, getCurrentUser);
userRouter.route("/renew-token").post(renewToken);
userRouter.route("/get-user/:username").get(verifyToken, getUserByUsername);
userRouter
  .route("/update-profile-picture")
  .put(verifyToken, upload.single("profilePhoto"), updateUserProfilePicture);

export default userRouter;
