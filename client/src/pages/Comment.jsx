import { Link, useLocation } from "react-router-dom";
import convertDateTime from "../utils/dateTimeConverter";
import LazyImage from "../components/LazyImage";
import { apiBaseUrl, defaultProfilePhoto } from "../utils/constants";
import PostComment from "../components/PostComment";
import { RiSendPlaneFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";

const Comment = () => {
  const { state } = useLocation();
  const commentBox = useRef();
  const { owner, caption, createdAt, postId } = state.postDetails;
  const [commentContent, setCommentContent] = useState("");
  const [addCommentLoader, setAddCommentLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  const addComment = async () => {
    if (commentContent.trim() === "" || !commentContent) return;

    try {
      setAddCommentLoader(true);
      const response = await axios.post(
        `${apiBaseUrl}/api/v1/comments/create-comment/${postId}`,
        {
          content: commentContent,
        },
        {
          withCredentials: true,
        }
      );

      if (response) {
        commentBox.current.value = "";
        setAddCommentLoader(false);
        getComments();
      }
    } catch (error) {
      setAddCommentLoader(false);
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiBaseUrl}/api/v1/comments/get-post-comments/${postId}`,
        {
          withCredentials: true,
        }
      );

      if (response) {
        setLoading(false);
        setComments(response?.data?.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const deleteComment = async (deletedComment) => {
    const response = await axios.delete(
      `${apiBaseUrl}/api/v1/comments/delete-comment/${deletedComment?._id}`,
      {
        withCredentials: true,
      }
    );

    if (
      response?.data?.status === 200 &&
      response?.data?.message === "Comment deleted successfully"
    ) {
      // remove from UI
      const updateComments = comments.filter(
        (comment) => comment?._id !== deletedComment?._id
      );
      setComments(updateComments);
    }
  };

  return (
    <div className="flex-1">
      <div className="min-h-screen pt-6 bg-text-clr-5 w-full sm:w-[70%] min-w-[15.5rem] max-w-[42rem] mx-auto flex flex-col">
        <div className="px-4 flex items-start gap-3 pb-4 border-b-[1px] border-text-clr-4">
          <div>
            <div className="rounded-full overflow-hidden w-[2rem] h-[2rem] sm:w-[2.5rem] sm:h-[2.5rem] border-2 sm:border-[3px] border-accent-clr">
              <LazyImage image={owner?.profilePhoto || defaultProfilePhoto} />
            </div>
          </div>
          <div>
            <div>
              <p className="text-text-clr-1 font-light text-[1rem]">
                <Link to={`/u/${owner?.username}`}>
                  <span className="text-text-clr-1 font-bold mr-2">
                    @{owner?.username}
                  </span>
                </Link>
                {caption}
              </p>
            </div>
            <div className="mt-1">
              <p className="text-text-clr-1 text-[0.8rem] sm:text-[0.9rem]">
                {convertDateTime(createdAt)}
              </p>
            </div>
          </div>
        </div>
        <p className="my-4 px-4 text-text-clr-1 text-[1rem] sm:text-lg">
          {comments.length} Comments
        </p>
        {loading && (
          <div className="my-4 flex justify-center items-center">
            <Loading />
          </div>
        )}
        <div className="px-4 flex-1">
          {comments.length === 0 ? (
            <p className="text-center text-text-clr-4 my-4">No comments yet</p>
          ) : (
            comments.map((comment) => {
              return (
                <PostComment
                  postId={postId}
                  comment={comment}
                  onDelete={deleteComment}
                  key={comment?._id}
                />
              );
            })
          )}
        </div>
        <div className="bg-primary-clr sticky bottom-[49.59px] sm:bottom-0 px-4 py-4 border-b-[2px] border-b-text-clr-4 focus-within:border-b-accent-clr flex items-center gap-2 transition duration-200 ease-in-out z-10">
          <input
            className="text-text-clr-1 w-full outline-none bg-transparent"
            type="text"
            ref={commentBox}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Write a comment"
          />
          {!addCommentLoader ? (
            <button onClick={addComment}>
              <RiSendPlaneFill className="text-accent-clr" size={24} />
            </button>
          ) : (
            <RiSendPlaneFill className="text-text-clr-4" size={24} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
