exports.error = (error, req, res, next) => {
  console.log(error);

  const httpStatusCode = error.statusCode || 500;
  let errorMsg = error.message || "Server Error";
  console.log("ERROR HANDLER!");
  if (!error.fixedMessage) {
    if (httpStatusCode >= 400 && httpStatusCode < 500) {
      errorMsg = "Invalid Request";
    } else if (httpStatusCode >= 500) {
      errorMsg = "Server Error";
    }
  }
  return res.status(httpStatusCode).json({ msg: errorMsg });
};
