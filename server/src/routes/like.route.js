import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import {
  getCurrentUserLikeStatus,
  getPostLikesCount,
  togglePostLike,
} from "../controllers/like.controller.js";

const likeRouter = Router();

likeRouter.route("/toggle-like").post(verifyToken, togglePostLike);
likeRouter
  .route("/get-current-user-like-status")
  .get(verifyToken, getCurrentUserLikeStatus);

likeRouter.route("/get-likes-count").get(verifyToken, getPostLikesCount);

export default likeRouter;
