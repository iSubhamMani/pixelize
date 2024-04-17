import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import {
  deletePost,
  getAllPosts,
  getUserPosts,
  uploadPost,
} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const postRouter = Router();

postRouter
  .route("/upload-post")
  .post(verifyToken, upload.single("image"), uploadPost);
postRouter.route("/delete-post/:postId").post(verifyToken, deletePost);
postRouter.route("/all-posts").get(verifyToken, getAllPosts);
postRouter.route("/user-posts/:username").get(verifyToken, getUserPosts);

export default postRouter;
