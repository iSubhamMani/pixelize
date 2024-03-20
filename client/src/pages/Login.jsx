import { Link } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";

const Login = () => {
  return (
    <div className="min-h-[100vh] bg-primary-clr px-6 py-6">
      <Navbar />
      <header className="text-center mt-[50px] sm:mt-[100px]">
        <h1 className="text-text-clr-1 text-4xl font-bold leading-[3rem] md:text-5xl">
          Login to your account
        </h1>
      </header>
      <main className="mt-[80px] sm:mt-[100px] flex flex-col items-center">
        <div className="sm:w-[60%] sm:max-w-[350px]">
          <div className="mb-4 w-full">
            <InputField type={"text"} placeholder={"username or email"} />
          </div>
          <div className="my-4 w-full">
            <InputField type={"password"} placeholder={"password"} />
          </div>
          <div className="mt-8 w-full">
            <Button content={"Login"} />
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-text-clr-1">Don&apos;t have an account?</p>
          <p>
            <Link to={"/register"}>
              <span className="text-accent-clr text-sm font-bold">
                Register
              </span>
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
