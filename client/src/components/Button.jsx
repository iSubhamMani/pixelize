const Button = ({ content }) => {
  return (
    <div className="w-full">
      <button className="px-5 py-4 w-full bg-secondary-clr text-[1.1rem] text-accent-clr hover:bg-hover-clr transition duration-200 ease-in-out shadow-md font-bold rounded-lg">
        {content}
      </button>
    </div>
  );
};

export default Button;
