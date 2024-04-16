import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Comment } from "../models/comment.model.js";
import mongoose from "mongoose";

const addComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  if (!postId) throw new ApiError(400, "Post ID is required");
  if (!content || content.trim() === "")
    throw new ApiError(400, "Content is required");

  const createdComment = await Comment.create({
    content,
    post: postId,
    owner: req.user?._id,
  });

  if (!createdComment) throw new ApiError(500, "Error adding comment");

  res
    .status(201)
    .json(new ApiResponse(201, "Comment added successfully", createdComment));
});

const getPostComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  if (!postId) throw new ApiError(400, "Post ID is required");

  const comments = await Comment.aggregate([
    {
      $match: { post: new mongoose.Types.ObjectId(postId) },
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
              username: 1,
              profilePhoto: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        owner: { $first: "$owner" },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);

  res
    .status(200)
    .json(new ApiResponse(200, "Comments fetched successfully", comments));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!commentId) throw new ApiError(400, "Comment ID is required");

  const deletedComment = await Comment.findByIdAndDelete(commentId);

  if (!deletedComment) throw new ApiError(500, "Error deleting comment");

  res.status(200).json(new ApiResponse(200, "Comment deleted successfully"));
});

export { addComment, getPostComments, deleteComment };
