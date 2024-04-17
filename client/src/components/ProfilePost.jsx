import { AiOutlineComment } from "react-icons/ai";
import LazyImage from "./LazyImage";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addLikedPosts,
  addProfileCachedPosts,
  deleteLikedPosts,
  setPostLikesCount,
} from "../redux/slices/post.slice";
import axios from "axios";

const ProfilePost = ({ post }) => {
  const { owner, caption, image, createdAt } = post;
  const { likedPosts, likeCount, profileCachedPosts } = useSelector(
    (state) => state.post
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (profileCachedPosts[post?._id]) return;
    dispatch(addProfileCachedPosts({ [post._id]: true }));
    // fetch post likes count
    getPostLikesCount();
  }, []);

  useEffect(() => {
    if (likedPosts[post?._id]) return;
    getCurrentUserLikeStatus();
  }, []);

  const togglePostLike = async () => {
    try {
      const response = await axios.post(
        "/api/v1/likes/toggle-like",
        {
          postId: post._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      getPostLikesCount();

      if (response.data?.status === 201) {
        // set like status
        dispatch(addLikedPosts({ [post._id]: true }));
      } else if (response.data?.status === 200) {
        // set like status
        dispatch(deleteLikedPosts(post._id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentUserLikeStatus = async () => {
    try {
      const response = await axios.get(
        `/api/v1/likes/get-current-user-like-status?postId=${post._id}`
      );

      if (response) {
        if (
          response.data?.message === "Post is liked" &&
          response.data?.status === 200
        )
          dispatch(addLikedPosts({ [post._id]: true }));
        else dispatch(deleteLikedPosts(post._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPostLikesCount = async () => {
    const response = await axios.get(
      `/api/v1/likes/get-likes-count?postId=${post._id}`
    );

    if (response) {
      dispatch(setPostLikesCount({ [post._id]: response.data?.data }));
    }
  };

  return (
    <div className="flex flex-col shadow-lg max-h-[600px]">
      <div className="flex-1 rounded-sm overflow-hidden relative mt-3">
        <LazyImage image={image} />
        <div className="w-full absolute bottom-0 px-4 py-3 left-0 flex items-center gap-2 bg-gradient-to-r from-[#000] to-transparent">
          {likedPosts[post?._id] ? (
            <FaHeart className="text-like-clr icon" onClick={togglePostLike} />
          ) : (
            <FaRegHeart
              className="text-text-clr-1 icon"
              onClick={togglePostLike}
            />
          )}
          {likeCount[post?._id] !== 0 ? (
            <span className="text-text-clr-1 text-[0.9rem] sm:text-[1rem]">
              {likeCount[post?._id]}
            </span>
          ) : null}
          <Link
            to={`/comments/${post?._id}`}
            state={{
              postDetails: {
                postId: post?._id,
                owner,
                caption,
                createdAt,
              },
            }}
          >
            <AiOutlineComment className="text-text-clr-1 icon" />
          </Link>
        </div>
      </div>
      <div className="bg-secondary-clr px-2 py-2 sm:px-4 sm:py-3">
        <span className="text-text-clr-1 text-[0.8rem] sm:text-[0.9rem] line-clamp-1">
          {caption}
        </span>
      </div>
    </div>
  );
};

export default ProfilePost;
