import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes
import userRouter from "./routes/user.route.js";
import errorHandler from "./utils/errorHandler.js";
import postRouter from "./routes/post.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

app.use(errorHandler);

export { app };
