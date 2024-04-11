import LazyImage from "./LazyImage";

const ProfilePost = ({ image }) => {
  return (
    <div>
      <LazyImage image={image} />
    </div>
  );
};

export default ProfilePost;
