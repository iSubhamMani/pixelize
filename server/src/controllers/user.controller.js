import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  validateEmail,
  validateFullName,
  validatePassword,
  validateUserName,
} from "../utils/validate.js";
import jwt from "jsonwebtoken";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal Server Error");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, username, email, password } = req.body;

  // validate
  if (
    [fullname, email, username, password].some(
      (field) => field?.trim() === "" || !field
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (
    !(
      validateFullName(fullname) &&
      validateUserName(username) &&
      validateEmail(email) &&
      validatePassword(password)
    )
  ) {
    throw new ApiError(400, "Invalid input");
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser)
    throw new ApiError(409, "User with that email or username already exists");

  // create user
  const user = await User.create({
    fullname,
    username: username,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) throw new ApiError(500, "Error creating user");

  return res
    .status(200)
    .json(new ApiResponse(201, "User created successfully", createdUser));
});

const loginUser = asyncHandler(async (req, res) => {
  const { password, username } = req.body;

  if (!username || username.trim() === "")
    throw new ApiError(400, "Username is required");
  if (!password || password.trim() === "")
    throw new ApiError(400, "Password is required");

  const user = await User.findOne({ username });

  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await user.validatePassword(password);

  if (!isPasswordValid) throw new ApiError(401, "Password is incorrect");

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: "true",
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "Login successful", {
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id).select("-password -refreshToken");

  if (!user) throw new ApiError(404, "User not found");

  res.status(200).json(new ApiResponse(200, "User found", user));
});

const renewToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;

  if (!incomingRefreshToken) throw new ApiError(401, "No refresh token");

  const decodedRefreshToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  const user = await User.findById(decodedRefreshToken?._id);

  if (!user) throw new ApiError(401, "Invalid refresh token");

  if (incomingRefreshToken !== user?.refreshToken)
    throw new ApiError(401, "Token mismatch");

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user?._id);

  await User.findByIdAndUpdate(user?._id, {
    refreshToken,
  }).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: "true",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "Token renewed", {
        accessToken,
        refreshToken,
      })
    );
});

export { registerUser, loginUser, getCurrentUser, renewToken };
