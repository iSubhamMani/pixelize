import { Link } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import camera from "../../assets/camera.png";
import { useRef, useState } from "react";

const Register = () => {
  return (
    <div className="min-h-[100vh] bg-primary-clr px-6 py-6">
      <Navbar />
      <header className="text-center mt-[50px]">
        <h1 className="text-text-clr-1 text-4xl font-bold leading-[3rem] md:text-5xl">
          Create a new account
        </h1>
      </header>
      <main className="mt-[50px] flex flex-col items-center">
        <div className="mt-[30px] sm:w-[60%] sm:max-w-[350px]">
          <div className="mb-4 w-full">
            <InputField type={"text"} placeholder={"fullname"} />
          </div>
          <div className="my-4 w-full">
            <InputField type={"text"} placeholder={"username"} />
          </div>
          <div className="my-4 w-full">
            <InputField type={"text"} placeholder={"email"} />
          </div>
          <div className="my-4 w-full">
            <InputField type={"password"} placeholder={"password"} />
          </div>
          <div className="mt-8 w-full">
            <Button content={"Register"} />
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-text-clr-1">Already have an account?</p>
          <p>
            <Link to={"/login"}>
              <span className="text-accent-clr text-sm font-bold">Login</span>
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
