module.exports = (req, res, next) => {
  console.log("authentication middleware");
  next();
};
