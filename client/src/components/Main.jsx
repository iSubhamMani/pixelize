import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import Navbar from "./Navbar";
import NavbarMobile from "./NavbarMobile";
import { useSelector } from "react-redux";

const Main = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <div className="min-h-[100vh] bg-primary-clr relative flex flex-col sm:flex-row">
      {user && (
        <div className="py-4 sm:hidden">
          <Logo />
        </div>
      )}
      {user && <Navbar />}
      <Outlet />
      {user && <NavbarMobile />}
    </div>
  );
};

export default Main;
