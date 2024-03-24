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
    .json(new ApiResponse(200, "Login successful", loggedInUser));
});

export { registerUser, loginUser };
