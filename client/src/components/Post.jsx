import convertDateTime from "../utils/dateTimeConverter";

const Post = ({ post }) => {
  const { owner, caption, image, createdAt } = post;

  return (
    <div className="my-2 flex flex-col gap-3">
      <div className="flex gap-3">
        <div className="rounded-full overflow-hidden w-[2.5rem] h-[2.5rem] sm:w-[3rem] sm:h-[3rem]">
          <img
            className="w-full h-full object-cover"
            src={owner?.profilePhoto}
            alt="pp"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-text-clr-1 font-bold text-[0.9rem] sm:text-[1rem]">
            @{owner?.username}
          </span>
          <span className="text-text-clr-1 text-[0.8rem] sm:text-[0.9rem]">
            {convertDateTime(createdAt)}
          </span>
        </div>
      </div>
      <div className="flex-1 rounded-sm overflow-hidden shadow-md">
        <img className="w-full h-full object-cover" src={image} alt="post" />
      </div>
      <div>
        <span className="text-text-clr-1 text-[0.8rem] sm:text-[0.9rem]">
          {caption}
        </span>
      </div>
    </div>
  );
};

export default Post;
