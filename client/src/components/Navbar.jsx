import Logo from "./Logo";
import home from "../../assets/home.png";
import like from "../../assets/like.png";
import profile from "../../assets/profile.png";
import search from "../../assets/search.png";
import create from "../../assets/create.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="hidden sm:flex sm:flex-col sm:w-[10%] md:w-[25%] sm:max-w-[270px] sm:py-6 bg-secondary-clr text-text-clr-1">
      <div className="sticky top-[2rem]">
        <Logo />
        <nav className="sm:mt-[4rem] sm:flex sm:flex-col sm:justify-start">
          <Link
            to={"/"}
            className="hover:bg-hover-clr sm:py-4 sm:px-3 md:px-6 flex sm:justify-center md:justify-start items-center gap-4"
          >
            <img className="w-[1.6rem]" src={home} alt="" />
            <span className="text-lg nav-text">Home</span>
          </Link>
          <Link
            to={"/search"}
            className="hover:bg-hover-clr sm:px-3 md:px-6 sm:py-4 flex sm:justify-center md:justify-start items-center gap-4"
          >
            <img className="w-[1.6rem]" src={search} alt="" />
            <span className="text-lg nav-text">Search</span>
          </Link>
          <Link
            to={"/new-post"}
            className="hover:bg-hover-clr sm:px-3 md:px-6 sm:py-4 flex sm:justify-center md:justify-start items-center gap-4"
          >
            <img className="w-[1.6rem]" src={create} alt="" />
            <span className="text-lg nav-text">New Post</span>
          </Link>
          <Link
            to={"/liked-posts"}
            className="hover:bg-hover-clr sm:px-3 md:px-6 sm:py-4 flex sm:justify-center md:justify-start items-center gap-4"
          >
            <img className="w-[1.6rem]" src={like} alt="" />
            <span className="text-lg nav-text">Liked Posts</span>
          </Link>
          <Link
            to={`/u/${user?.username}`}
            className="hover:bg-hover-clr sm:px-3 md:px-6 sm:py-4 flex sm:justify-center md:justify-start items-center gap-4"
          >
            <img className="w-[1.6rem]" src={profile} alt="" />
            <span className="text-lg nav-text">Profile</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
