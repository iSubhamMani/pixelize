import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadPhotoToCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

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

  const fileExtension = imageLocalPath.split(".").pop();

  if (
    !(
      fileExtension === "jpg" ||
      fileExtension === "jpeg" ||
      fileExtension === "png"
    )
  ) {
    throw new ApiError(400, "Invalid file type");
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

const getAllPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 4 } = req.query;

  const options = {
    page,
    limit,
  };

  const pipeline = [
    {
      $match: {
        owner: { $ne: new mongoose.Types.ObjectId(req.user?._id) },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              _id: 1,
              fullname: 1,
              username: 1,
              profilePhoto: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        owner: {
          $first: "$owner",
        },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ];

  const posts = await Post.aggregatePaginate(Post.aggregate(pipeline), options);

  return res
    .status(200)
    .json(new ApiResponse(200, "Posts fetched successfully", posts));
});

const getUserPosts = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const { page = 1, limit = 4 } = req.query;

  if (!username) throw new ApiError(400, "Username is required");

  const options = {
    page,
    limit,
  };

  const user = await User.findOne({ username }).select(
    "-password -refreshToken"
  );

  const pipeline = [
    {
      $match: {
        owner: user?._id,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ];

  const posts = await Post.aggregatePaginate(Post.aggregate(pipeline), options);

  return res
    .status(200)
    .json(new ApiResponse(200, "User posts fetched successfully", posts));
});

export { uploadPost, getAllPosts, getUserPosts };
