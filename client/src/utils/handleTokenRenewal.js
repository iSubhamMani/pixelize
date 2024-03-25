import axios from "axios";

const handleTokenRenewal = async (successHandler, errorHandler) => {
  try {
    const response = await axios.post("/api/v1/users/renew-token");

    if (response.data.status === 200) {
      successHandler();
    }
  } catch (error) {
    if (error.status === 401) errorHandler();
  }
};

export default handleTokenRenewal;
