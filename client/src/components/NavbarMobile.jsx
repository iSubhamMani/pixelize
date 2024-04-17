import home from "../../assets/home.png";
import logout from "../../assets/logout.png";
import profile from "../../assets/profile.png";
import search from "../../assets/search.png";
import create from "../../assets/create.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavbarMobile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="sm:hidden sticky bottom-0 w-full bg-secondary-clr px-6 py-3">
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
        <Link to={`/u/${user?.username}`}>
          <img className="w-[1.6rem]" src={profile} alt="" />
        </Link>
        <div className="cursor-pointer">
          <img className="w-[1.6rem]" src={logout} alt="" />
        </div>
      </nav>
    </div>
  );
};

export default NavbarMobile;
