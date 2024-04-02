import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import Navbar from "./Navbar";
import NavbarMobile from "./NavbarMobile";

const Main = () => {
  return (
    <div className="min-h-[100vh] bg-primary-clr relative flex flex-col sm:flex-row">
      <div className="py-4 sm:hidden">
        <Logo />
      </div>
      <Navbar />
      <Outlet />
      <NavbarMobile />
    </div>
  );
};

export default Main;
