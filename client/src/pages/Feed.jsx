import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import handleTokenRenewal from "../utils/handleTokenRenewal";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/slices/user.slice";
import Loading from "../components/Loading";
import Post from "../components/Post";
import {
  addPosts,
  setHasMore,
  updatePageNumber,
} from "../redux/slices/feedSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";

const Feed = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { posts, hasMore, page } = useSelector((state) => state.feed);
  const [error, setError] = useState(null);

  useEffect(() => {
    verifyUser();

    if (user) return;
    fetchPosts();
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

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/api/v1/posts/all-posts?page=${page}`);

      if (response) {
        dispatch(addPosts(response.data?.data?.docs));
        dispatch(updatePageNumber());
        dispatch(setHasMore(response.data?.data?.hasNextPage));
      }
    } catch (error) {
      if (
        error.response?.data?.status === 401 &&
        error.response?.data?.message === "No refresh token"
      )
        navigate("/login");
      else if (
        error.response?.data?.status === 401 &&
        error.response?.data?.message === "Access token expired"
      ) {
        handleTokenRenewal(fetchPosts, () => {
          navigate("/login");
        });
      }

      if (error.response?.data?.message === "Access token expired")
        setError(null);
      else setError(error.message);
    }
  };

  return isAuthenticated ? (
    <div className="px-4 py-6 flex-1">
      {error && (
        <div className="text-center my-4">
          <p className="text-error-clr">{error}</p>
        </div>
      )}
      {posts.length !== 0 ? (
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMore}
          loader={
            <div className="my-4 flex justify-center items-center">
              <Spinner />
            </div>
          }
          scrollThreshold={0.95}
          endMessage={
            <p className="my-4 text-center text-text-clr-1">
              Oops! looks like you&apos;ve reached the end
            </p>
          }
          style={{ overflow: "hidden" }}
        >
          <div className="posts-container gap-4">
            {posts.map((post) => {
              return <Post key={post._id} post={post} />;
            })}
          </div>
        </InfiniteScroll>
      ) : (
        <div>
          <p className="text-center text-text-clr-1">No posts found</p>
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
