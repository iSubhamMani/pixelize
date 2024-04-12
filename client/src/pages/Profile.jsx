import { useDispatch, useSelector } from "react-redux";
import { defaultProfilePhoto } from "../utils/constants";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ClientError } from "../utils/ClientError";
import Loading from "../components/Loading";
import { FaRegImage } from "react-icons/fa6";
import { addPosts, removeAllPosts } from "../redux/slices/profileSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";
import ProfilePost from "../components/ProfilePost";

const Profile = () => {
  const { username } = useParams();
  const { user } = useSelector((state) => state.user);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [userDetails, setUserDetails] = useState(null);
  const dispatch = useDispatch();

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

  const getUserDetails = async () => {
    try {
      setLoading(true);
      if (!username) throw new ClientError("Username is required");

      const response = await axios.get(`/api/v1/users/get-user/${username}`);
      if (response) {
        setLoading(false);
        setUserDetails(response.data?.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await axios.get(
        `/api/v1/posts/user-posts/${username}?page=${page}`
      );

      if (response) {
        dispatch(addPosts(response?.data?.data?.docs));
        setPage(page + 1);
        setHasMore(response?.data?.data?.hasNextPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return !loading ? (
    <div className="px-4 py-6 flex-1 sm:mt-8">
      <div className="text-center mb-6">
        <span className="text-accent-clr text-lg sm:text-xl font-bold">
          @{userDetails?.username}
        </span>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="flex flex-col gap-1 text-sm md:text-lg text-accent-clr font-medium text-center">
          <span>500K</span>
          <span>followers</span>
        </div>
        <div className="overflow-hidden w-[8rem] sm:[10rem] md:w-[12rem] min-w-[6rem] rounded-full">
          <img
            className="w-full h-full object-cover"
            src={userDetails?.profilePhoto || defaultProfilePhoto}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-1 text-sm md:text-lg text-text-clr-1 font-medium text-center">
          <span>102K</span>
          <span>following</span>
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
        <div className="flex justify-center">
          <button className="bg-secondary-clr font-medium hover:bg-hover-clr transition duration-200 ease-in-out text-white text-[0.9rem] sm:text-[1rem] px-4 py-2 sm:px-6 sm:py-3 rounded-full">
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          <button className="bg-secondary-clr font-medium hover:bg-hover-clr transition duration-200 ease-in-out text-text-clr-2 text-[0.9rem] sm:text-[1rem] px-4 py-2 sm:px-6 sm:py-3 rounded-full">
            Follow
          </button>
        </div>
      )}
      <div className="my-8 px-6">
        <div>
          <FaRegImage className="text-text-clr-1 icon-mark" />
        </div>
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
                return <ProfilePost key={post?._id} image={post?.image} />;
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