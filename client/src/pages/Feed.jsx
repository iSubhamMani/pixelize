import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import handleTokenRenewal from "../utils/handleTokenRenewal";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slices/user.slice";
import Loading from "../components/Loading";

const Feed = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    try {
      const response = await axios.get("/api/v1/users/current-user");

      if (
        response.data?.status === 200 &&
        response.data?.message === "User found"
      ) {
        setIsAuthenticated(true);
        // add user to store
        dispatch(addUser(response.data?.data));
      }
    } catch (error) {
      if (
        error.response.data?.status === 401 &&
        error.response.data?.message === "No refresh token"
      )
        navigate("/login");
      else if (
        error.response.data?.status === 401 &&
        error.response.data?.message === "Access token expired"
      ) {
        handleTokenRenewal(verifyUser, () => {
          navigate("/login");
        });
      }
    }
  };

  return isAuthenticated ? (
    <div className="main-content px-4 py-8 flex flex-col">
      <div className="mb-8">
        <h1 className="text-white text-2xl">Feed</h1>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
