import home from "../../assets/home.png";
import like from "../../assets/like.png";
import profile from "../../assets/profile.png";
import search from "../../assets/search.png";
import create from "../../assets/create.png";
import { Link } from "react-router-dom";

const NavbarMobile = () => {
  return (
    <div className="sm:hidden fixed bottom-0 w-full bg-secondary-clr px-6 py-3">
      <nav className="flex items-center justify-between gap-2">
        <Link to={"/"}>
          <img className="w-[1.6rem]" src={home} alt="" />
        </Link>
        <Link to={"/search"}>
          <img className="w-[1.6rem]" src={search} alt="" />
        </Link>
        <Link to={"/new-post"}>
          <img className="w-[1.6rem]" src={create} alt="" />
        </Link>
        <Link to={"/liked-posts"}>
          <img className="w-[1.6rem]" src={like} alt="" />
        </Link>
        <Link to={"/profile"}>
          <img className="w-[1.6rem]" src={profile} alt="" />
        </Link>
      </nav>
    </div>
  );
};

export default NavbarMobile;
