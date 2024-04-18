import { useDispatch, useSelector } from "react-redux";
import { apiBaseUrl, defaultProfilePhoto } from "../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ClientError } from "../utils/ClientError";
import Loading from "../components/Loading";
import { addPosts, removeAllPosts } from "../redux/slices/profileSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";
import ProfilePost from "../components/ProfilePost";
import handleTokenRenewal from "../utils/handleTokenRenewal";
import LazyImage from "../components/LazyImage";
import { IoMdRefresh } from "react-icons/io";
import { removeProfileCachedPosts } from "../redux/slices/post.slice";

const Profile = () => {
  const { username } = useParams();
  const { user } = useSelector((state) => state.user);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [profileUpdate, setProfileUpdate] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(null);

  const [userDetails, setUserDetails] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts } = useSelector((state) => state.profile);

  useEffect(() => {
    if (username === user?.username) setIsCurrentUser(true);
    getUserDetails();
  }, [username]);

  useEffect(() => {
    setPage(1);
  }, [username]);

  useEffect(() => {
    if (page !== 1) return;
    dispatch(removeAllPosts());
    getUserPosts();
  }, [page]);

  useEffect(() => {
    handleProfileEdit();
  }, [profilePic]);

  const getUserDetails = async () => {
    try {
      setError(null);
      setLoading(true);
      if (!username) throw new ClientError("Username is required");

      const response = await axios.get(
        `${apiBaseUrl}/api/v1/users/get-user/${username}`
      );
      if (response) {
        setLoading(false);
        setUserDetails(response.data?.data);
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong");
    }
  };

  const getUserPosts = async () => {
    try {
      setError(null);
      setPostsLoading(true);
      const response = await axios.get(
        `${apiBaseUrl}/api/v1/posts/user-posts/${username}?page=${page}`
      );

      if (response) {
        setPostsLoading(false);
        dispatch(addPosts(response?.data?.data?.docs));
        setPage(page + 1);
        setHasMore(response?.data?.data?.hasNextPage);
      }
    } catch (error) {
      setPostsLoading(false);
      setError("Something went wrong");
    }
  };

  const handleProfileEdit = async () => {
    if (!profilePic) return;

    try {
      setProfileUpdate(true);
      setError(null);
      const formData = new FormData();
      formData.append("profilePhoto", profilePic);

      const response = await axios.put(
        `${apiBaseUrl}/api/v1/users/update-profile-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        setProfileUpdate(false);
        getUserDetails();
      }
    } catch (error) {
      setProfileUpdate(false);

      if (
        error.response?.data?.status === 401 &&
        error.response?.data?.message === "No refresh token"
      )
        navigate("/login");
      else if (
        error.response?.data?.status === 401 &&
        error.response?.data?.message === "Access token expired"
      ) {
        handleTokenRenewal(handleProfileEdit, () => {
          navigate("/login");
        });
      }

      if (error.response?.data?.message === "Invalid file type")
        setError(error.response?.data?.message);
      else if (error.response?.data?.message === "Profile picture is required")
        setError(error.response?.data?.message);
      else if (
        error.response?.data?.message === "Error uploading profile picture"
      )
        setError(error.response?.data?.message);
      else if (
        error.response?.data?.message === "Error updating profile picture"
      )
        setError(error.response?.data?.message);
      else if (error.response?.data?.message === "Error deleting old avatar")
        setError(error.response?.data?.message);
      else if (error.response?.data?.message === "Access token expired")
        setError(null);
      else setError(error.message);
    }
  };

  const handleProfileRefresh = async () => {
    dispatch(removeProfileCachedPosts());
    setPage(1);
  };

  return !loading ? (
    <div className="px-4 py-6 flex-1 sm:mt-8">
      <div className="text-center mb-6">
        <span className="text-accent-clr text-lg sm:text-xl font-bold">
          @{userDetails?.username}
        </span>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="overflow-hidden w-[8rem] h-[8rem] sm:w-[10rem] sm:h-[10rem] md:w-[12rem] md:h-[12rem] min-w-[6rem] min-h-[6rem] rounded-full border-4 sm:border-[6px] border-secondary-clr">
          <LazyImage image={userDetails?.profilePhoto || defaultProfilePhoto} />
        </div>
      </div>
      <div className="text-center my-6">
        <p className="text-text-clr-1 font-medium text-[1.2rem] md:text-[1.5rem]">
          {userDetails?.fullname}
        </p>
      </div>
      <div className="text-center my-6">
        <p className="text-text-clr-1 font-medium text-[1.2rem] md:text-[1.5rem]">
          {userDetails?.bio || ""}
        </p>
      </div>
      {isCurrentUser ? (
        !profileUpdate ? (
          <div className="flex justify-center">
            <input
              id="file-upload"
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
            <label
              className="cursor-pointer bg-secondary-clr font-medium hover:bg-hover-clr transition duration-200 ease-in-out text-white text-[0.9rem] sm:text-[1rem] px-4 py-2 sm:px-6 sm:py-3 rounded-full"
              htmlFor="file-upload"
            >
              Edit Profile Photo
            </label>
            {error && (
              <div className="text-center my-4">
                <p className="text-error-clr">{error}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="px-4 py-6 flex-1 sm:mt-8 flex justify-center items-center">
            <Loading />
          </div>
        )
      ) : (
        <div className="flex justify-center">
          <button className="bg-secondary-clr font-medium hover:bg-hover-clr transition duration-200 ease-in-out text-text-clr-2 text-[0.9rem] sm:text-[1rem] px-4 py-2 sm:px-6 sm:py-3 rounded-full">
            Follow
          </button>
        </div>
      )}
      <div className="my-8 px-6">
        <div className="flex gap-4">
          <button onClick={handleProfileRefresh}>
            <IoMdRefresh className="text-text-clr-1 icon-mark" />
          </button>
        </div>
        {postsLoading && (
          <div className="my-6 flex justify-center items-center">
            <Loading />
          </div>
        )}
        {posts.length !== 0 ? (
          <InfiniteScroll
            dataLength={posts.length}
            next={getUserPosts}
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
            <div className="posts-container gap-4 my-4">
              {posts.map((post) => {
                return <ProfilePost key={post?._id} post={post} />;
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <div>
            <p className="text-center text-text-clr-1">No posts found</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="px-4 py-6 flex-1 sm:mt-8 flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default Profile;
