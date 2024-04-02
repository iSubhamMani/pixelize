import icon from "../../assets/icon.png";

const Logo = () => {
  return (
    <div className="px-6 sm:px-3 md:px-6 py-2 flex gap-2 items-center sm:justify-center md:justify-start">
      <img className="w-8" src={icon} alt="" />
      <h1 className="text-xl text-accent-clr sm:hidden md:block font-bold cursor-pointer">
        Pixelize
      </h1>
    </div>
  );
};

export default Logo;
