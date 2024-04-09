import axios from "axios";
import { useState } from "react";
import { ClientError } from "../utils/ClientError";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import handleTokenRenewal from "../utils/handleTokenRenewal";

const UploadPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlePostUpload = async () => {
    try {
      setError(null);
      setLoading(true);
      if (!image) throw new ClientError("Please select an image");
      if (!caption || caption.trim() === "")
        throw new ClientError("Please enter a caption");
      const formData = new FormData();
      formData.append("image", image);
      formData.append("caption", caption);

      const response = await axios.post("/api/v1/posts/upload-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        setError(null);
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);

      if (
        error.response?.data?.status === 401 &&
        error.response?.data?.message === "No refresh token"
      )
        navigate("/login");
      else if (
        error.response?.data?.status === 401 &&
        error.response?.data?.message === "Access token expired"
      ) {
        handleTokenRenewal(handlePostUpload, () => {
          navigate("/login");
        });
      }

      if (error.response?.data?.message === "Invalid file type")
        setError(error.response?.data?.message);
      else if (error.response?.data?.message === "Caption is required")
        setError(error.response?.data?.message);
      else if (error.response?.data?.message === "Image is required")
        setError(error.response?.data?.message);
      else if (error.response?.data?.message === "Failed to upload image")
        setError(error.response?.data?.message);
      else if (error.response?.data?.message === "Failed to upload post")
        setError(error.response?.data?.message);
      else if (error.response?.data?.message === "Access token expired")
        setError(null);
      else setError(error.message);
    }
  };

  return (
    <div className="px-4 py-8 flex flex-1 flex-col items-center justify-center">
      {error && (
        <div className="text-center mt-2 mb-4">
          <p className="text-error-clr">{error}</p>
        </div>
      )}

      {loading && (
        <div className="mt-2 mb-4 text-center">
          <Spinner />
        </div>
      )}

      <div className="mb-8 flex justify-center">
        <input
          id="file-upload"
          accept="image/png, image/jpeg"
          className="hidden"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label
          className="text-sm sm:text-[1rem] bg-secondary-clr px-4 py-4 text-white font-medium cursor-pointer hover:bg-hover-clr transition duration-200 ease-in-out shadow-md rounded-lg"
          htmlFor="file-upload"
        >
          Upload a photo
        </label>
      </div>

      {image && (
        <div className="flex items-center justify-center mb-8 flex-col">
          <div className="my-2 w-full sm:w-[80%] min-w-[250px] 2xl:max-w-[1200px]">
            <input
              className="focus:border-transparent focus:outline-none px-4 py-3 bg-transparent w-full text-white placeholder:text-text-clr-3
              text-sm sm:text-[1.1rem]"
              type="text"
              placeholder="Type a caption.."
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <div className="rounded-md shadow-md overflow-hidden w-full sm:w-[80%] min-w-[250px] 2xl:max-w-[1200px] h-[300px] sm:h-[400px] md:h-[500px]">
            <div className="h-full">
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {image && (
        <button
          className="text-sm sm:text-[1rem] bg-secondary-clr px-4 py-4 text-white font-medium cursor-pointer hover:bg-hover-clr transition duration-200 ease-in-out shadow-md rounded-lg"
          onClick={handlePostUpload}
        >
          Post
        </button>
      )}
    </div>
  );
};

export default UploadPost;
