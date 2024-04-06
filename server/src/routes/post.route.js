import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import { getAllPosts, uploadPost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const postRouter = Router();

postRouter
  .route("/upload-post")
  .post(verifyToken, upload.single("image"), uploadPost);

postRouter.route("/all-posts").get(verifyToken, getAllPosts);

export default postRouter;
