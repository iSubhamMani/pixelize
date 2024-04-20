import multer from "multer";
import path from "path";
import fs from "fs";
import { ensureDirectoryExists } from "../utils/directory";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dirName = path.dirname(fileURLToPath(import.meta.url));

    const uploadDir = path.join(dirName, "../../public/temp");

    ensureDirectoryExists(uploadDir)
      .then(() => {
        cb(null, uploadDir);
      })
      .catch((err) => {
        console.error("Error ensuring directory existence:", err);
      });
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
