import convertDateTime from "../utils/dateTimeConverter";
import { FaRegHeart } from "react-icons/fa6";
import { AiOutlineComment } from "react-icons/ai";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";
import { defaultProfilePhoto } from "../utils/constants";

const Post = ({ post }) => {
  const { owner, caption, image, createdAt } = post;

  return (
    <div className="my-2 flex flex-col shadow-lg">
      <div className="flex gap-3">
        <div className="rounded-full overflow-hidden w-[2rem] h-[2rem] sm:w-[3rem] sm:h-[3rem]">
          <img
            className="w-full h-full object-cover"
            src={owner?.profilePhoto || defaultProfilePhoto}
            alt="pp"
          />
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
          <FaRegHeart className="text-text-clr-1 icon" />
          <AiOutlineComment className="text-text-clr-1 icon" />
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
