import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import { togglePostLike } from "../controllers/like.controller.js";

const likeRouter = Router();

likeRouter.route("/toggle-like").post(verifyToken, togglePostLike);

export default likeRouter;
