import convertDateTime from "../utils/dateTimeConverter";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { AiOutlineComment } from "react-icons/ai";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";
import axios from "axios";
import { defaultProfilePhoto } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCachedPosts,
  addLikedPosts,
  deleteLikedPosts,
  setPostLikesCount,
} from "../redux/slices/post.slice";

const Post = ({ post }) => {
  const { owner, caption, image, createdAt } = post;

  const { likedPosts, cachedPosts, likeCount } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (cachedPosts[post?._id]) return;
    dispatch(addCachedPosts({ [post._id]: true }));
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
    <div className="my-2 flex flex-col shadow-lg ">
      <div className="flex gap-3">
        <div className="rounded-full overflow-hidden w-[2rem] h-[2rem] sm:w-[3rem] sm:h-[3rem] border-2 sm:border-[3px] border-accent-clr">
          <LazyImage image={owner?.profilePhoto || defaultProfilePhoto} />
        </div>
        <div className="flex flex-col">
          <Link to={`/u/${owner?.username}`}>
            <span className="line-clamp-1 text-text-clr-1 font-bold text-[0.9rem] sm:text-[1rem]">
              @{owner?.username}
            </span>
          </Link>
          <span className="text-text-clr-1 text-[0.8rem] sm:text-[0.9rem]">
            {convertDateTime(createdAt)}
          </span>
        </div>
      </div>
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

export default Post;
