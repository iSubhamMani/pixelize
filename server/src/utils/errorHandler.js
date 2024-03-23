import ApiResponse from "./ApiResponse.js";

const errorHandler = (err, req, res, next) => {
  // Handle the error
  res
    .status(err.statusCode || 500)
    .json(new ApiResponse(err.statusCode || 500, err.message, null));
};

export default errorHandler;
