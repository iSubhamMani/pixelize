import { Link } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { ClientError } from "../utils/ClientError";
import {
  validateEmail,
  validateFullName,
  validatePassword,
  validateUserName,
} from "../utils/validate";
import axios from "axios";

const Register = () => {
  const [fullName, setFullName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const validateUserDetails = () => {
    if (
      [fullName, email, userName, password].some(
        (field) => field?.trim() === "" || !field
      )
    ) {
      throw new ClientError("All fields are required", 400);
    }

    if (!validateFullName(fullName)) {
      throw new ClientError("Invalid fullname", 400);
    }

    if (!validateUserName(userName)) {
      throw new ClientError("Invalid username", 400);
    }

    if (!validateEmail(email)) {
      throw new ClientError("Invalid email address", 400);
    }

    if (!validatePassword(password)) {
      throw new ClientError(
        "Password must have at least 8 characters, a capital letter and a digit",
        400
      );
    }
  };

  const handleRequest = async () => {
    try {
      const response = await axios.post(
        "/api/v1/users/register",
        {
          fullname: fullName,
          username: userName,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        console.log(response);
      }
    } catch (error) {
      // handle and display error
      console.log(error);
    }
  };

  const handleSubmit = () => {
    try {
      setError(null);
      // validate input
      validateUserDetails();
      // send a post request
      handleRequest();
    } catch (error) {
      // display error
      if (error.code === "ERR_BAD_RESPONSE")
        setError("Something went wrong, please check your internet connection");
      else setError(error.message);
    }
  };

  return (
    <div className="min-h-[100vh] bg-primary-clr px-6 py-6">
      <Navbar />
      <header className="text-center mt-[50px]">
        <h1 className="text-text-clr-1 text-4xl font-bold leading-[3rem] md:text-5xl">
          Create a new account
        </h1>
      </header>
      <main className="mt-[20px] sm:mt-[50px] flex flex-col items-center">
        {error && (
          <div className="text-center mt-4">
            <p className="text-error-clr">{error}</p>
          </div>
        )}
        <div className="mt-[30px] sm:w-[60%] sm:max-w-[350px]">
          <div className="mb-4 w-full">
            <InputField
              name={"fullname"}
              type={"text"}
              placeholder={"fullname"}
              onChangeHandler={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="my-4 w-full">
            <InputField
              name={"username"}
              type={"text"}
              placeholder={"username"}
              onChangeHandler={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="my-4 w-full">
            <InputField
              name={"email"}
              type={"email"}
              placeholder={"email"}
              onChangeHandler={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-4 w-full">
            <InputField
              name={"password"}
              type={"password"}
              placeholder={"password"}
              onChangeHandler={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-8 w-full">
            <Button content={"Register"} onClickHandler={handleSubmit} />
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
