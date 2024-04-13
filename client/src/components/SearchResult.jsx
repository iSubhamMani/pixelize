import { defaultProfilePhoto } from "../utils/constants";
import LazyImage from "./LazyImage";
import { Link } from "react-router-dom";

const SearchResult = ({ userDetails }) => {
  return (
    <div className="flex flex-col sm:flex-row rounded-lg shadow-lg gap-5 sm:gap-3 bg-secondary-clr px-4 py-3 sm:py-4 w-full max-w-[500px] hover:bg-hover-clr cursor-pointer transition duration-200 ease-in-out">
      <div className="flex gap-3 flex-1">
        <div className="flex-4 w-[3rem] h-[3rem] sm:w-[4rem] sm:h-[4rem] overflow-hidden rounded-full border-2 sm:border-[3px] border-accent-clr">
          <LazyImage image={userDetails?.profilePhoto || defaultProfilePhoto} />
        </div>
        <div className="flex flex-col justify-start">
          <h3 className="text-[1rem] sm:text-[1.1rem] text-text-clr-1 font-bold line-clamp-1">
            {userDetails?.fullname}
          </h3>
          <h3 className="text-[0.8rem] sm:text-sm text-text-clr-4 line-clamp-1">
            @{userDetails?.username}
          </h3>
        </div>
      </div>
      <div className="flex justify-end sm:items-center">
        <Link to={`/u/${userDetails?.username}`}>
          <button className="shadow-md px-3 py-2 sm:px-4 sm:py-3 text-[0.8rem] sm:text-sm rounded-full font-bold text-accent-clr bg-primary-clr">
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchResult;
