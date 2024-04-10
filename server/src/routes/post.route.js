import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import {
  getAllPosts,
  getUserPosts,
  uploadPost,
} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const postRouter = Router();

postRouter
  .route("/upload-post")
  .post(verifyToken, upload.single("image"), uploadPost);

postRouter.route("/all-posts").get(verifyToken, getAllPosts);
postRouter.route("/user-posts/:username").get(verifyToken, getUserPosts);

export default postRouter;
