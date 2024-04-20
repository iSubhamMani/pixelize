import fs from "fs";

const ensureDirectoryExists = (directoryPath) => {
  return new Promise((resolve, reject) => {
    fs.stat(directoryPath, (err, stats) => {
      if (err) {
        if (err.code === "ENOENT") {
          // Directory does not exist, create it
          fs.mkdir(directoryPath, { recursive: true }, (mkdirErr) => {
            if (mkdirErr) {
              reject(mkdirErr);
            } else {
              resolve(true); // Directory created successfully
            }
          });
        } else {
          // Some other error occurred
          reject(err);
        }
      } else {
        // Directory already exists
        resolve(true);
      }
    });
  });
};

export { ensureDirectoryExists };
