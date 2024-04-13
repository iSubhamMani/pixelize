import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Like } from "../models/like.model.js";

const togglePostLike = async (req, res) => {
  const { postId } = req.body;

  if (!postId) throw new ApiError(400, "Post ID is required");

  const isLiked = await Like.findOne({ post: postId, owner: req.user?._id });

  if (!isLiked) {
    // like the post
    const like = await Like.create({
      post: postId,
      owner: req.user?._id,
    });

    if (!like) throw new ApiError(500, "Failed to like the post");

    return res
      .status(201)
      .json(new ApiResponse(201, "Post liked successfully", like));
  } else {
    // unlike the post
    const unlike = await Like.deleteOne({ post: postId, owner: req.user?._id });

    if (!unlike) throw new ApiError(500, "Failed to unlike the post");

    return res
      .status(200)
      .json(new ApiResponse(200, "Post unliked successfully", unlike));
  }
};

export { togglePostLike };
