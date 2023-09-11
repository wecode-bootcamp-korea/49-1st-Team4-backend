const throwError = (statusCode, message) => {
  console.log("creating new error");
  const error = new Error(message);
  error.status = statusCode;
  console.log("new error", error);
  throw error;
};

module.exports = {
  throwError,
};
