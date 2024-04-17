import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadPhotoToCloudinary = async (imageLocalPath) => {
  try {
    if (!imageLocalPath) return;

    const response = await cloudinary.uploader.upload(imageLocalPath, {
      folder: "pixelize/posts",
      resource_type: "image",
    });

    fs.unlinkSync(imageLocalPath);
    return response;
  } catch (error) {
    fs.unlinkSync(imageLocalPath);
    return;
  }
};

const uploadProfilePicToCloudinary = async (imageLocalPath) => {
  try {
    if (!imageLocalPath) return;

    const response = await cloudinary.uploader.upload(imageLocalPath, {
      folder: "pixelize/profilePics",
      resource_type: "image",
    });

    fs.unlinkSync(imageLocalPath);
    return response;
  } catch (error) {
    fs.unlinkSync(imageLocalPath);
    return;
  }
};

const deleteProfilePicFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return;

    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    return response;
  } catch (error) {
    return;
  }
};

const deletePhotoFromCloduinary = async (publicId) => {
  try {
    if (!publicId) return;

    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    return response;
  } catch (error) {
    return;
  }
};

export {
  uploadPhotoToCloudinary,
  uploadProfilePicToCloudinary,
  deleteProfilePicFromCloudinary,
  deletePhotoFromCloduinary,
};
