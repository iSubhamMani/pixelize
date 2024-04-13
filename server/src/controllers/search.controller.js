import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getUserBySearch = asyncHandler(async (req, res) => {
  const searchQuery = req.query?.q;

  if (!searchQuery) throw new ApiError(400, "Search query is required");

  const users = await User.find({
    $or: [
      { username: { $regex: searchQuery, $options: "i" } },
      { fullname: { $regex: searchQuery, $options: "i" } },
    ],
  }).select("-password -refreshToken");

  return res.status(200).json(new ApiResponse(200, "Users found", users));
});

export { getUserBySearch };
