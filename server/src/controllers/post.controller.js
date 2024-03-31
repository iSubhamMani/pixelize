import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { Post } from "../models/post.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadPhotoToCloudinary } from "../utils/cloudinary.js";

const uploadPost = asyncHandler(async (req, res) => {
  const { caption } = req.body;
  const imageLocalPath = req.file?.path;

  // validate input
  if (!caption) {
    throw new ApiError(400, "Caption is required");
  }

  if (!imageLocalPath) {
    throw new ApiError(400, "Image is required");
  }

  // upload photo to cloudinary
  const imageResponse = await uploadPhotoToCloudinary(imageLocalPath);

  if (!imageResponse) {
    throw new ApiError(500, "Failed to upload image");
  }

  // save post to database
  const post = await Post.create({
    image: imageResponse?.secure_url,
    caption,
    owner: req.user?._id,
  });

  if (!post) {
    throw new ApiError(500, "Failed to upload post");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, "Post uploaded successfully", post));
});

export { uploadPost };
