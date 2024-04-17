import { Link } from "react-router-dom";
import { defaultProfilePhoto } from "../utils/constants";
import convertDateTime from "../utils/dateTimeConverter";
import LazyImage from "./LazyImage";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";

const PostComment = ({ comment, onDelete }) => {
  const { user } = useSelector((state) => state.user);

  const handleDeleteComment = () => {
    onDelete(comment);
  };

  return (
    <div className="flex items-start gap-3 my-6">
      <div>
        <div className="rounded-full overflow-hidden w-[2rem] h-[2rem] sm:w-[2.5rem] sm:h-[2.5rem] border-2 sm:border-[3px] border-accent-clr">
          <LazyImage
            image={comment?.owner?.profilePhoto || defaultProfilePhoto}
          />
        </div>
      </div>
      <div className="flex-1">
        <div>
          <p className="text-text-clr-1 font-light text-[0.97rem] sm:text-[1rem]">
            <Link to={`/u/${comment?.owner?.username}`}>
              <span className="text-text-clr-1 font-bold mr-2">
                @{comment?.owner?.username}
              </span>
            </Link>
            {comment?.content}
          </p>
        </div>
        <div className="mt-1">
          <p className="text-text-clr-1 text-[0.8rem] sm:text-[0.9rem]">
            {convertDateTime(comment?.createdAt)}
          </p>
        </div>
      </div>
      {comment?.owner?._id === user?._id && (
        <div>
          <button onClick={handleDeleteComment}>
            <AiFillDelete className="text-error-clr text-[1rem] sm:text-[1.25rem]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PostComment;
