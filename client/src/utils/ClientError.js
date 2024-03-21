class ClientError extends Error {
  constructor(message = "Something went wrong", statusCode) {
    super(message);
    this.statusCode = statusCode;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ClientError };
