import icon from "../../assets/icon.png";

const Logo = () => {
  return (
    <div className="px-8 py-2 flex gap-2 items-center">
      <img className="w-8" src={icon} alt="" />
      <h1 className="text-xl text-accent-clr font-bold cursor-pointer">
        Pixelize
      </h1>
    </div>
  );
};

export default Logo;
