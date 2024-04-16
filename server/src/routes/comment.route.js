import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import {
  addComment,
  deleteComment,
  getPostComments,
} from "../controllers/comment.controller.js";

const commentRouter = Router();

commentRouter.route("/create-comment/:postId").post(verifyToken, addComment);
commentRouter
  .route("/get-post-comments/:postId")
  .get(verifyToken, getPostComments);
commentRouter
  .route("/delete-comment/:commentId")
  .delete(verifyToken, deleteComment);

export default commentRouter;
