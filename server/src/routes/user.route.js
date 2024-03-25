import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  renewToken,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/current-user").get(verifyToken, getCurrentUser);
userRouter.route("/renew-token").post(renewToken);

export default userRouter;
