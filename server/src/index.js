import dotenv from "dotenv";
import connectToDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectToDB()
  .then(() => {
    app.on("error", (e) => {
      console.log(`Error starting app: ${e}`);
      process.exit(1);
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((e) => {
    console.log(`MongoDB connection failed: ${e}`);
  });
