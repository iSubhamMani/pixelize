import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import { uploadPost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const postRouter = Router();

postRouter
  .route("/upload-post")
  .post(verifyToken, upload.single("image"), uploadPost);

export default postRouter;
