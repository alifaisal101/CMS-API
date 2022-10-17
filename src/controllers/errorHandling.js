exports.error = (error, req, res, next) => {
  const httpStatusCode = error.httpStatusCode || 500;
  const errorMsg = error.message || "Server Error";
  console.log("ERROR HANDLER!");
  return res.status(httpStatusCode).json({ msg: errorMsg });
};
