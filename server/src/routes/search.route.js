import { Router } from "express";
import { getUserBySearch } from "../controllers/search.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

const searchRouter = Router();

searchRouter.route("/get-search-results").get(verifyToken, getUserBySearch);

export default searchRouter;
