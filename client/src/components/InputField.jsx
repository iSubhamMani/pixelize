const InputField = ({ type, placeholder, name, onChangeHandler }) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChangeHandler}
        autoComplete="off"
        className="px-5 py-4 bg-secondary-clr placeholder:text-text-clr-3 shadow-md w-full min-w-[200px] text-[1.1rem] text-text-clr-1 focus:outline-accent-clr rounded-lg"
      />
    </div>
  );
};

export default InputField;
