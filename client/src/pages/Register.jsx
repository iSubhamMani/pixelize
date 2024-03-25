import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Logo from "../components/Logo";
import { useEffect, useState } from "react";
import { ClientError } from "../utils/ClientError";
import {
  validateEmail,
  validateFullName,
  validatePassword,
  validateUserName,
} from "../utils/validate";
import axios from "axios";
import Spinner from "../components/Spinner";

const Register = () => {
  const [fullName, setFullName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!registered) return;

    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [registered]);

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

      if (response.status === 200 && response.data?.status === 201) {
        setLoading(false);
        setRegistered(true);
      }
    } catch (error) {
      setLoading(false);

      if (error.response.data?.status === 409)
        setError(error.response.data?.message);
      else if (error.response.data?.status === 500)
        setError(error.response.data?.message);
      else setError(error.message);
    }
  };

  const handleSubmit = () => {
    try {
      setError(null);
      setLoading(true);
      // validate input
      validateUserDetails();
      // send a post request
      handleRequest();
    } catch (error) {
      // display error
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-[100vh] bg-primary-clr px-2 py-4 sm:px-6 sm:py-6">
      <Logo />
      <header className="text-center mt-[50px]">
        <h1 className="text-text-clr-1 text-4xl font-bold leading-[3rem] md:text-5xl">
          Create a new account
        </h1>
      </header>
      <main className="mt-[20px] sm:mt-[50px] flex flex-col items-center">
        {registered && (
          <div className="text-center mt-4">
            <p className="text-green-600">
              Registered successfully. You will soon be redirected to login page
            </p>
          </div>
        )}
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
          <div className="mt-8 w-full text-center">
            {loading ? (
              <Spinner />
            ) : (
              <Button content={"Register"} onClickHandler={handleSubmit} />
            )}
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
