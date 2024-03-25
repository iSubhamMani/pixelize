import Logo from "./Logo";
import home from "../../assets/home.png";
import like from "../../assets/like.png";
import profile from "../../assets/profile.png";
import search from "../../assets/search.png";
import create from "../../assets/create.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="hidden sm:flex sm:flex-col sm:fixed sm:w-[270px] sm:left-0 sm:h-full sm:py-6 bg-secondary-clr text-text-clr-1">
      <Logo />
      <nav className="sm:mt-[4rem] sm:flex sm:flex-col sm:justify-start">
        <Link
          to={"/"}
          className="hover:bg-hover-clr sm:py-4 sm:px-6 flex items-center gap-4"
        >
          <img className="w-[1.6rem]" src={home} alt="" />
          <span className="text-lg">Home</span>
        </Link>
        <Link
          to={"/search"}
          className="hover:bg-hover-clr sm:px-6 sm:py-4 flex items-center gap-4"
        >
          <img className="w-[1.6rem]" src={search} alt="" />
          <span className="text-lg">Search</span>
        </Link>
        <Link
          to={"/new-post"}
          className="hover:bg-hover-clr sm:px-6 sm:py-4 flex items-center gap-4"
        >
          <img className="w-[1.6rem]" src={create} alt="" />
          <span className="text-lg">New Post</span>
        </Link>
        <Link
          to={"/liked-posts"}
          className="hover:bg-hover-clr sm:px-6 sm:py-4 flex items-center gap-4"
        >
          <img className="w-[1.6rem]" src={like} alt="" />
          <span className="text-lg">Liked Posts</span>
        </Link>
        <Link
          to={"/profile"}
          className="hover:bg-hover-clr sm:px-6 sm:py-4 flex items-center gap-4"
        >
          <img className="w-[1.6rem]" src={profile} alt="" />
          <span className="text-lg">Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
