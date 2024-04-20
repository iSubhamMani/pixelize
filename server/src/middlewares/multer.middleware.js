import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    const uploadDir = path.join(__dirname, "../../public/temp");
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
