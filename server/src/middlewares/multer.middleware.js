import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dirName = path.dirname(fileURLToPath(import.meta.url));

    const uploadDir = path.join(dirName, "../../public/temp");
    console.log("uploadDir", uploadDir);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
