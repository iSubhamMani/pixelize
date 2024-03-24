import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { ClientError } from "../utils/ClientError";
import { validatePassword, validateUserName } from "../utils/validate";
import axios from "axios";
import Spinner from "../components/Spinner";

const Login = () => {
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) return;

    navigate("/feed");
  }, [loggedIn]);

  const validateUserDetails = () => {
    if ([userName, password].some((field) => field?.trim() === "" || !field)) {
      throw new ClientError("All fields are required", 400);
    }

    if (!validateUserName(userName)) {
      throw new ClientError("Invalid username", 400);
    }

    if (!validatePassword(password)) {
      throw new ClientError("Invalid password", 400);
    }
  };

  const handleRequest = async () => {
    try {
      const response = await axios.post(
        "/api/v1/users/login",
        {
          username: userName,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data?.status === 200) {
        setLoading(false);
        setLoggedIn(true);
      }
    } catch (error) {
      setLoading(false);

      if (error.response.data?.status === 404)
        setError(error.response.data?.message);
      else if (error.response.data?.status === 401)
        setError(error.response.data?.message);
      else setError(error.message);
    }
  };

  const handleLogin = () => {
    try {
      setError(null);
      setLoading(true);
      // validate
      validateUserDetails();
      // send request
      handleRequest();
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-[100vh] bg-primary-clr px-6 py-6">
      <Navbar />
      <header className="text-center mt-[50px] sm:mt-[100px]">
        <h1 className="text-text-clr-1 text-4xl font-bold leading-[3rem] md:text-5xl">
          Login to your account
        </h1>
      </header>
      <main className="mt-[30px] sm:mt-[40px] flex flex-col items-center">
        {error && (
          <div className="text-center mt-4">
            <p className="text-error-clr">{error}</p>
          </div>
        )}
        <div className="mt-[20px] sm:mt-[30px] sm:w-[60%] sm:max-w-[350px]">
          <div className="mb-4 w-full">
            <InputField
              type={"text"}
              placeholder={"username"}
              onChangeHandler={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="my-4 w-full">
            <InputField
              type={"password"}
              placeholder={"password"}
              onChangeHandler={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-8 w-full text-center">
            {loading ? (
              <Spinner />
            ) : (
              <Button content={"Login"} onClickHandler={handleLogin} />
            )}
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
